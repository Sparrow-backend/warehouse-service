const Inventory = require('./inventory.mongo');

async function createInventory(inventoryData) {
    try {
        const inventory = new Inventory(inventoryData);
        await inventory.save();
        return inventory;
    } catch (error) {
        throw new Error(`Error creating inventory: ${error.message}`);
    }
}

async function getInventoryById(id) {
    try {
        return await Inventory.findById(id)
            .populate('warehouseId')
            .populate('parcelId');
    } catch (error) {
        throw new Error(`Error fetching inventory: ${error.message}`);
    }
}

async function getInventoryByWarehouse(warehouseId) {
    try {
        return await Inventory.find({ warehouseId })
            .populate('parcelId')
            .populate('warehouseId');
    } catch (error) {
        throw new Error(`Error fetching warehouse inventory: ${error.message}`);
    }
}

async function getInventoryByParcel(parcelId) {
    try {
        return await Inventory.findOne({ parcelId })
            .populate('warehouseId')
            .populate('parcelId');
    } catch (error) {
        throw new Error(`Error fetching parcel inventory: ${error.message}`);
    }
}

async function updateInventory(id, updateData) {
    try {
        updateData.updatedTimestamp = Date.now();
        return await Inventory.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('warehouseId').populate('parcelId');
    } catch (error) {
        throw new Error(`Error updating inventory: ${error.message}`);
    }
}

async function checkOutParcel(id) {
    try {
        return await Inventory.findByIdAndUpdate(
            id,
            { 
                checkOutTime: Date.now(),
                updatedTimestamp: Date.now()
            },
            { new: true }
        ).populate('warehouseId').populate('parcelId');
    } catch (error) {
        throw new Error(`Error checking out parcel: ${error.message}`);
    }
}

async function deleteInventory(id) {
    try {
        return await Inventory.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting inventory: ${error.message}`);
    }
}

async function getAllInventory() {
    try {
        return await Inventory.find({})
            .populate('warehouseId')
            .populate('parcelId');
    } catch (error) {
        throw new Error(`Error fetching inventory: ${error.message}`);
    }
}

async function getActiveInventory() {
    try {
        return await Inventory.find({ checkOutTime: null })
            .populate('warehouseId')
            .populate('parcelId');
    } catch (error) {
        throw new Error(`Error fetching active inventory: ${error.message}`);
    }
}

module.exports = {
    createInventory,
    getInventoryById,
    getInventoryByWarehouse,
    getInventoryByParcel,
    updateInventory,
    checkOutParcel,
    deleteInventory,
    getAllInventory,
    getActiveInventory
};