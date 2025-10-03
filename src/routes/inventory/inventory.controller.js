const {
    createInventory,
    getInventoryById,
    getInventoryByWarehouse,
    getInventoryByParcel,
    updateInventory,
    checkOutParcel,
    deleteInventory,
    getAllInventory,
    getActiveInventory
} = require('../../models/inventory/inventory.model');

async function httpCreateInventory(req, res) {
    try {
        const inventoryData = req.body;
        const newInventory = await createInventory(inventoryData);
        return res.status(201).json({
            success: true,
            data: newInventory,
            message: 'Inventory created successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetInventoryById(req, res) {
    try {
        const { id } = req.params;
        const inventory = await getInventoryById(id);
        
        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: 'Inventory not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: inventory
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetInventoryByWarehouse(req, res) {
    try {
        const { warehouseId } = req.params;
        const inventory = await getInventoryByWarehouse(warehouseId);
        
        return res.status(200).json({
            success: true,
            count: inventory.length,
            data: inventory
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetInventoryByParcel(req, res) {
    try {
        const { parcelId } = req.params;
        const inventory = await getInventoryByParcel(parcelId);
        
        if (!inventory) {
            return res.status(404).json({
                success: false,
                message: 'Inventory not found for this parcel'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: inventory
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetAllInventory(req, res) {
    try {
        const inventory = await getAllInventory();
        return res.status(200).json({
            success: true,
            count: inventory.length,
            data: inventory
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetActiveInventory(req, res) {
    try {
        const inventory = await getActiveInventory();
        return res.status(200).json({
            success: true,
            count: inventory.length,
            data: inventory
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpUpdateInventory(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedInventory = await updateInventory(id, updateData);
        
        if (!updatedInventory) {
            return res.status(404).json({
                success: false,
                message: 'Inventory not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: updatedInventory,
            message: 'Inventory updated successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpCheckOutParcel(req, res) {
    try {
        const { id } = req.params;
        const checkedOutInventory = await checkOutParcel(id);
        
        if (!checkedOutInventory) {
            return res.status(404).json({
                success: false,
                message: 'Inventory not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: checkedOutInventory,
            message: 'Parcel checked out successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpDeleteInventory(req, res) {
    try {
        const { id } = req.params;
        const deletedInventory = await deleteInventory(id);
        
        if (!deletedInventory) {
            return res.status(404).json({
                success: false,
                message: 'Inventory not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Inventory deleted successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    httpCreateInventory,
    httpGetInventoryById,
    httpGetInventoryByWarehouse,
    httpGetInventoryByParcel,
    httpGetAllInventory,
    httpGetActiveInventory,
    httpUpdateInventory,
    httpCheckOutParcel,
    httpDeleteInventory
};