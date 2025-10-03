const {
    createWarehouse,
    getWarehouseById,
    getWarehouseByCode,
    getAllWarehouses,
    getActiveWarehouses,
    updateWarehouse,
    addParcelToWarehouse,
    removeParcelFromWarehouse,
    updateWarehouseStatus,
    deleteWarehouse,
    getWarehouseCapacity
} = require('../../models/warehouse/warehouse.model');


async function httpGetWarehouseByCode(req, res) {
    try {
        const { code } = req.params;
        const warehouse = await getWarehouseByCode(code);
        
        if (!warehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: warehouse
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetAllWarehouses(req, res) {
    try {
        const filters = {};
        if (req.query.status) {
            filters.status = req.query.status;
        }
        
        const warehouses = await getAllWarehouses(filters);
        return res.status(200).json({
            success: true,
            count: warehouses.length,
            data: warehouses
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetActiveWarehouses(req, res) {
    try {
        const warehouses = await getActiveWarehouses();
        return res.status(200).json({
            success: true,
            count: warehouses.length,
            data: warehouses
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpUpdateWarehouse(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedWarehouse = await updateWarehouse(id, updateData);
        
        if (!updatedWarehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: updatedWarehouse,
            message: 'Warehouse updated successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpAddParcelToWarehouse(req, res) {
    try {
        const { id } = req.params;
        const { parcelId } = req.body;
        
        if (!parcelId) {
            return res.status(400).json({
                success: false,
                message: 'Parcel ID is required'
            });
        }
        
        const updatedWarehouse = await addParcelToWarehouse(id, parcelId);
        
        if (!updatedWarehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: updatedWarehouse,
            message: 'Parcel added to warehouse successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpRemoveParcelFromWarehouse(req, res) {
    try {
        const { id } = req.params;
        const { parcelId } = req.body;
        
        if (!parcelId) {
            return res.status(400).json({
                success: false,
                message: 'Parcel ID is required'
            });
        }
        
        const updatedWarehouse = await removeParcelFromWarehouse(id, parcelId);
        
        if (!updatedWarehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: updatedWarehouse,
            message: 'Parcel removed from warehouse successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpUpdateWarehouseStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required'
            });
        }
        
        const updatedWarehouse = await updateWarehouseStatus(id, status);
        
        if (!updatedWarehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: updatedWarehouse,
            message: 'Warehouse status updated successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpDeleteWarehouse(req, res) {
    try {
        const { id } = req.params;
        const deletedWarehouse = await deleteWarehouse(id);
        
        if (!deletedWarehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Warehouse deleted successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetWarehouseCapacity(req, res) {
    try {
        const { id } = req.params;
        const capacity = await getWarehouseCapacity(id);
        
        return res.status(200).json({
            success: true,
            data: warehouse
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpCreateWarehouse(req, res) {
    try {
        const warehouseData = req.body;
        const newWarehouse = await createWarehouse(warehouseData);
        return res.status(201).json({
            success: true,
            data: newWarehouse,
            message: 'Warehouse created successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetWarehouseById(req, res) {
    try {
        const { id } = req.params;
        const warehouse = await getWarehouseById(id);
        
        if (!warehouse) {
            return res.status(404).json({
                success: false,
                message: 'Warehouse not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: capacity
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    httpCreateWarehouse,
    httpGetWarehouseById,
    httpGetWarehouseByCode,
    httpGetAllWarehouses,
    httpGetActiveWarehouses,
    httpUpdateWarehouse,
    httpAddParcelToWarehouse,
    httpRemoveParcelFromWarehouse,
    httpUpdateWarehouseStatus,
    httpDeleteWarehouse,
    httpGetWarehouseCapacity
};
