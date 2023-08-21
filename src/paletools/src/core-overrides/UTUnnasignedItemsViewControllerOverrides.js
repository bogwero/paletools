export default function executeUnassignedItemsViewControllerOverrides() {
    const UTUnassignedItemsViewController_getUnassignedItems = UTUnassignedItemsViewController.prototype._getUnassignedItems;
    UTUnassignedItemsViewController.prototype._getUnassignedItems = function _getUnassignedItems(...args) {
        repositories.Item.setDirty(ItemPile.PURCHASED);
        repositories.Item.setDirty(ItemPile.INBOX);

        UTUnassignedItemsViewController_getUnassignedItems.call(this, ...args);
    }
}