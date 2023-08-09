import settings from "../../settings";
import Cache from "../caching/Cache";
import CacheEntry from "../caching/cacheEntry";
import { isExternalRequestSupported } from "../http";
import { getUserPlatform } from "../user";
import { FutbinPriceProvider } from "./prices/FutbinPriceProvider";

const _pricesCache = new Cache(1000 * 60 * 5); // 5 minutes expiration
const priceProviders = {
    "futbin": new FutbinPriceProvider()
}

export async function getExternalMarketPricesProviders() {
    return settings.externalServices.prices.providers;
}

export async function setExternalMarketPricesProvider(provider) {
    settings.externalServices.prices.provider = provider;
}

export async function getExternalMarketPrices(items) {
    if (!isExternalRequestSupported()) return {};

    items = items.filter(x => x.isPlayer());

    if (items.length === 0) return {};

    const priceProvider = priceProviders[settings.externalServices.prices.provider];

    const itemsToQuery = [];
    const prices = {};
    for (let item of items) {
        const price = _pricesCache.get(item.definitionId);
        if (price) {
            prices[item.definitionId] = price;
        }
        else {
            itemsToQuery.push(item);
        }
    }

    const pricesFromProvider = await priceProvider.getItemPrices(items, getUserPlatform());
    for (let price of pricesFromProvider) {
        prices[price.definitionId] = price.price;
        _pricesCache.set(price.definitionId, price.price);
    }

    return prices;
}