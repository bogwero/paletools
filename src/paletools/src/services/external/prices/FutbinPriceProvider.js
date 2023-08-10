import { notifyFailure } from "../../../utils/notifications";
import http, { isExternalRequestSupported } from "../../http";
import ItemPrice from "./ItemPrice";
import { PriceProvider } from "./PriceProvider";


export class FutbinPriceProvider extends PriceProvider {

    async getItemPrices(items, gamePlatform) {
        if(!await isExternalRequestSupported()) return [];

        const playerIds = [];
        for (const item of items) {
            if (!item.definitionId) continue;
            if (!item.isPlayer()) continue;

            playerIds.push(item.definitionId);
        }

        const prices = [];
        const futbinPlatform = gamePlatform === GamePlatform.PC ? "pc" : "ps";
        try {
            while (playerIds.length > 0) {
                const maxPlayerIds = playerIds.splice(0, 30);
                const playerId = maxPlayerIds.shift();

                if (!playerId) continue;

                const futbinPricesUrl = `https://www.futbin.com/23/playerPrices?player=${playerId}&rids=${maxPlayerIds.join(",")}`;
                const futbinResponse = await http(futbinPricesUrl);

                const futbinPrices = await futbinResponse.json();

                for (const priceId of Object.keys(futbinPrices)) {
                    const futbinPrice = futbinPrices[priceId];
                    if (!futbinPrice
                        || futbinPrice.prices.length === 0
                        || !futbinPrice.prices[futbinPlatform]
                        || !futbinPrice.prices[futbinPlatform].LCPrice) continue;

                    try {
                        const price = parseInt(futbinPrices[priceId].prices[futbinPlatform].LCPrice.replace(/[,.]/g, ""));
                        prices.push(new ItemPrice(priceId, price, gamePlatform));
                    } catch {

                    }
                }
            }

            return prices;
        }
        catch {
            notifyFailure("Error fetching futbin prices");
            return [];
        }
    }
}