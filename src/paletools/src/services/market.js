import delay from "../utils/delay";
import { toPromise } from "../utils/observable";
import Cache from "./caching/Cache";
import db from "./db";
import sendPinEvents from "./pinEvents";

const itemActionController = new UTItemActionController();

const itemSellValues = new Cache(300);

export function getAuctionProfit(item, sellPrice) {
	return new Promise(resolve => {
		const calc = buyPrice => {

			if (!sellPrice) {
				const auctionData = item.getAuctionData();
				sellPrice = auctionData.isSold()
					? auctionData.currentBid
					: auctionData.currentBid > 0
						? auctionData.currentBid
						: auctionData.buyNowPrice;
			}

			resolve(calculateProfit(buyPrice, sellPrice));
		}

		if (item.lastSalePrice > 0 || item.hasOwnProperty("hasBuyInfo")) {
			calc(item.lastSalePrice);
		}
		else {
			db.transactions.getBuyByItemId(item.id).then(tx => {
				if (tx && tx.price) {
					item.hasBuyInfo = true;
					item.lastSalePrice = tx.price;
					calc(tx.price);
				}
				else {
					item.hasBuyInfo = false;
					calc(0);
				}
			});
		}
	});
}

export function calculateProfit(buyPrice, sellPrice) {
	const profit = Math.round((getPriceAfterTax(sellPrice) - buyPrice) * 100) / 100;
	const profitPerc = Math.round((profit / sellPrice) * 10000) / 100;

	return [profit, profitPerc];
}

export function setItemSellValue(definitionId, minValue) {
	itemSellValues.set(definitionId, minValue);
}

export function getItemSellValue(definitionId) {
	itemSellValues.get(definitionId);
}

export function getTransferListItems() {
	return new Promise((resolve, reject) => {
		services.Item.requestTransferItems().observe(this, (e, response) => {
			if (response.success) {
				resolve(response.response.items);
			}
			else {
				reject(response.error);
			}
		});
	});
}

export function getTransferListAvailableItems() {
	return new Promise((resolve, reject) => {
		services.Item.requestTransferItems().observe(this, (e, response) => {
			if (response.success) {
				var availableItems = (JSUtils.isObject(response.response) ? response.response.items : []).filter(function(e) {
					return !e.getAuctionData().isValid()
				});
				resolve(availableItems);
			}
			else {
				reject(response.error);
			}
		});
	});
}

export function getWatchedItems() {
	return new Promise((resolve, reject) => {
		services.Item.requestWatchedItems().observe(this, (e, response) => {
			if (response.success) {
				resolve(response.response.items);
			}
			else {
				reject(response.error);
			}
		});
	});
}

export async function tryBidItem(item, bid) {
	if(!item) return false;

	if(auction._tradeState === AuctionTradeStateEnum.ACTIVE) {
		const bidResponse = await toPromise(itemActionController.bid(item, bid));
		return bidResponse.success;
	}
}

export function tryBuyItem(items) {
	if (!items || items.length === 0) return false;

	return new Promise((resolve, reject) => {
		if (!items || items.length === 0) {
			resolve(false);
			return;
		}

		for (let item of items) {
			const auction = item._auction;
			if (auction._tradeState === AuctionTradeStateEnum.ACTIVE) {
				itemActionController.bid(item, auction.buyNowPrice).observe(this, function (e, t) {
					e.unobserve(this);
					if (t.success) {
						resolve({ success: true, item: item });
					}
					else {
						resolve({ success: false, item: item });
					}
				});
				break;
			}
		}
	});
}

export async function listItemOnTransferMarket(item, sellPrice, startPrice, ignoreCardIfOffLimits) {
	await getPriceLimits(item);
	if (sellPrice) {
		if (item.hasPriceLimits()) {
			if (!ignoreCardIfOffLimits) {
				sellPrice = computeSellPrice(sellPrice, item);
			} else if (sellPrice < item._itemPriceLimits.minimum || sellPrice > item._itemPriceLimits.maximum) {
				return;
			}
		}
		sellPrice = roundOffPrice(sellPrice, 200);
		services.Item.list(
			item,
			startPrice || getSellBidPrice(sellPrice),
			sellPrice,
			3600
		);
	}

	return sellPrice;
};

function updateSearchCriteriaFromItemType(searchCriteria, itemType) {
	searchCriteria.type = null;
	searchCriteria.category = null;

	if (itemType === ItemType.BADGE || itemType === ItemType.KIT) {
		searchCriteria.category = itemType;
		searchCriteria.type = SearchType.CLUB_INFO;
		return;
	}

	if (itemType === ItemType.HEALTH || itemType === ItemType.CONTRACT) {
		searchCriteria.type = SearchType.CONSUMABLES_DEVELOPMENT;
		searchCriteria.category = itemType === ItemType.HEALTH ? SearchCategory.HEALING : SearchCategory.CONTRACT;
		return;
	}

	if (itemType === ItemType.TRAINING) {
		searchCriteria.type = SearchType.CONSUMABLES_TRAINING;
		return;
	}

	if (itemType === ItemType.MANAGER) {
		searchCriteria.type = SearchType.STAFF;
		return;
	}

	if (itemType === ItemType.NONE) {
		searchCriteria.type = SearchType.ANY;
		return;
	}

	searchCriteria.type = itemType;
}

export async function findLowestMarketPrice(definitionId, itemType = SearchType.PLAYER, pricesCount = 3) {
	if(typeof definitionId === "string") {
		definitionId = parseInt(definitionId);
	}
	const searchCriteria = new UTSearchCriteriaDTO();
	const searchModel = new UTBucketedItemSearchViewModel();

	updateSearchCriteriaFromItemType(searchCriteria, itemType);
	searchCriteria.defId = [definitionId];
	searchModel.searchFeature = ItemSearchFeature.MARKET;
	searchModel.defaultSearchCriteria.type = searchCriteria.type;
	searchModel.defaultSearchCriteria.category = searchCriteria.category;

	let minBuyNowArr = [];
	let iteration = 0;
	while (true) {
		if (++iteration === 10) {
			break;
		}

		sendPinEvents("Transfer Market Search");
		services.Item.clearTransferMarketCache();
		searchModel.updateSearchCriteria(searchCriteria);

		let items = await performMarketSearch(searchModel.searchCriteria);
		if (items.length === 0) {
			break;
		}

		const minBuyNow = Math.min(...items.map(x => x._auction.buyNowPrice));
		minBuyNowArr.unshift({ value: minBuyNow, count: items.filter(x => x._auction.buyNowPrice === minBuyNow).length });
		searchCriteria.maxBuy = roundOffPrice(getSellBidPrice(minBuyNow));

		if (items.length < searchModel.searchCriteria.count) {
			break;
		}

		await delay(100, 300);
	}

	if (minBuyNowArr.length > 0) {
		setItemSellValue(definitionId, minBuyNowArr[0]);
	}

	if (pricesCount <= 1) {
		return minBuyNowArr[0];
	}

	return minBuyNowArr.slice(0, pricesCount);
}

function performMarketSearch(criteria) {
	return new Promise((resolve, reject) => {
		services.Item.searchTransferMarket(criteria, 1).observe(
			this,
			(sender, response) => {
				if (response.success) {
					sendPinEvents("Transfer Market Results - List View");
					sendPinEvents("Item - Detail View");
					resolve(response.data.items);
				} else {
					resolve([]);
				}
			}
		)
	});
}

function computeSellPrice(sellPrice, item) {
	sellPrice = roundOffPrice(
		Math.min(
			item._itemPriceLimits.maximum,
			Math.max(item._itemPriceLimits.minimum, sellPrice)
		)
	);

	if (sellPrice === item._itemPriceLimits.minimum) {
		sellPrice = getBuyBidPrice(sellPrice);
	}

	return sellPrice;
}

async function getPriceLimits(item) {
	return new Promise((resolve) => {
		if (item.hasPriceLimits()) {
			resolve();
			return;
		}
		services.Item.requestMarketData(item).observe(
			this,
			async function () {
				resolve();
			}
		);
	});
}

export function getSellBidPrice(bin) {
	if (bin <= 1000) return bin - 50;
	if (bin > 1000 && bin <= 10000) return bin - 100;
	if (bin > 10000 && bin <= 50000) return bin - 250;
	if (bin > 50000 && bin <= 100000) return bin - 500;
	return bin - 1000;
}

export function getBuyBidPrice(bin) {
	if (bin < 1000) return bin + 50;
	if (bin >= 1000 && bin < 10000) return bin + 100;
	if (bin >= 10000 && bin < 50000) return bin + 250;
	if (bin >= 50000 && bin < 100000) return bin + 500;
	return bin + 1000;
}

export function roundOffPrice(price, minVal = 0) {
	let range = JSUtils.find(UTCurrencyInputControl.PRICE_TIERS, function (e) {
		return price >= e.min;
	});
	var nearestPrice = Math.round(price / range.inc) * range.inc;
	return Math.max(Math.min(nearestPrice, 14999000), minVal);
}

export function getPriceAfterTax(price) {
	return price - (price * 5 / 100);
}