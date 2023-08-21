import { executeItemDetailsOverrides } from "./ItemDetailsOverrides";
import executeServicesOverrides from "./ServicesOverrides";
import { executeAuctionActionPanelViewOverrides } from "./UTAuctionActionPanelViewOverrides";
import executeDefaultActionPanelViewOverrides from "./UTDefaultActionPanelViewOverrides";
import executeDropDownControlOverrides from "./UTDropDownControlOverrides";
import executeItemTableCellViewOverrides from "./UTItemTableCellViewOverrides";
import executeMarketSearchFiltersViewControllerOverrides from "./UTMarketSearchFiltersViewControllerOverrides";
import executeMarketSearchFiltersViewOverrides from "./UTMarketSearchFiltersViewOverrides";
import executeMarketSearchResultsViewControllerOverrides from "./UTMarketSearchResultsViewControllerOverrides";
import executeQuickListPanelViewControllerOverrides from "./UTQuickListPanelViewControllerOverrides";
import executeSlotActionPanelViewOverrides from "./UTSlotActionPanelViewOverrides";
import executeTransferListViewControllerOverrides from "./UTTransferListViewControllerOverrides";
import executeWatchListViewControllerOverrides from "./UTWatchListViewControllerOverrides";
import executePackAnimationShineViewOverrides from "./UTPackAnimationShineViewOverrides";
import executeSquadSlotViewOverrides from "./UTSquadSlotViewOverrides";
import executeSquadBuilderViewControllerOverrides from "./UTSquadBuilderViewControllerOverrides";
import executeUnassignedItemsViewControllerOverrides from "./UTUnnasignedItemsViewControllerOverrides";

export default function runOverrides(){
    executeMarketSearchFiltersViewControllerOverrides();
    executeMarketSearchFiltersViewOverrides();
    executeMarketSearchResultsViewControllerOverrides();
    executeDefaultActionPanelViewOverrides();
    executeAuctionActionPanelViewOverrides();
    executeItemTableCellViewOverrides();
    executeSlotActionPanelViewOverrides();
    executeDropDownControlOverrides();
    executeItemDetailsOverrides();
    executeTransferListViewControllerOverrides();
    executeWatchListViewControllerOverrides();
    executeServicesOverrides();
    executeQuickListPanelViewControllerOverrides();
    executePackAnimationShineViewOverrides();
    executeSquadSlotViewOverrides();
    executeSquadBuilderViewControllerOverrides();
    executeUnassignedItemsViewControllerOverrides();
}