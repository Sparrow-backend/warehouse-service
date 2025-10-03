const Warehouse = require('./warehouse.mongo');

async function createWarehouse(warehouseData) {
    try {
        const warehouse = new Warehouse(warehouseData);
        await warehouse.save();
        return warehouse;
    } catch (error) {
        throw new Error(`Error creating warehouse: ${error.message}`);
    }
}

async function getWarehouseById(id) {
    try {
        return await Warehouse.findById(id)
            .populate('address')
            .populate('contact')
            .populate('receivedParcels');
    } catch (error) {
        throw new Error(`Error fetching warehouse: ${error.message}`);
    }
}

async function getWarehouseByCode(code) {
    try {
        return await Warehouse.findOne({ code })
            .populate('address')
            .populate('contact')
            .populate('receivedParcels');
    } catch (error) {
        throw new Error(`Error fetching warehouse: ${error.message}`);
    }
}

async function getAllWarehouses(filters = {}) {
    try {
        return await Warehouse.find(filters)
            .populate('address')
            .populate('contact')
            .populate('receivedParcels');
    } catch (error) {
        throw new Error(`Error fetching warehouses: ${error.message}`);
    }
}

async function getActiveWarehouses() {
    try {
        return await Warehouse.find({ status: 'active' })
            .populate('address')
            .populate('contact');
    } catch (error) {
        throw new Error(`Error fetching active warehouses: ${error.message}`);
    }
}

async function updateWarehouse(id, updateData) {
    try {
        updateData.updatedTimestamp = Date.now();
        return await Warehouse.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate('address').populate('contact').populate('receivedParcels');
    } catch (error) {
        throw new Error(`Error updating warehouse: ${error.message}`);
    }
}

async function addParcelToWarehouse(warehouseId, parcelId) {
    try {
        return await Warehouse.findByIdAndUpdate(
            warehouseId,
            { 
                $addToSet: { receivedParcels: parcelId },
                updatedTimestamp: Date.now()
            },
            { new: true }
        ).populate('address').populate('contact').populate('receivedParcels');
    } catch (error) {
        throw new Error(`Error adding parcel to warehouse: ${error.message}`);
    }
}

async function removeParcelFromWarehouse(warehouseId, parcelId) {
    try {
        return await Warehouse.findByIdAndUpdate(
            warehouseId,
            { 
                $pull: { receivedParcels: parcelId },
                updatedTimestamp: Date.now()
            },
            { new: true }
        ).populate('address').populate('contact').populate('receivedParcels');
    } catch (error) {
        throw new Error(`Error removing parcel from warehouse: ${error.message}`);
    }
}

async function updateWarehouseStatus(id, status) {
    try {
        return await Warehouse.findByIdAndUpdate(
            id,
            { 
                status,
                updatedTimestamp: Date.now()
            },
            { new: true, runValidators: true }
        ).populate('address').populate('contact');
    } catch (error) {
        throw new Error(`Error updating warehouse status: ${error.message}`);
    }
}

async function deleteWarehouse(id) {
    try {
        return await Warehouse.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting warehouse: ${error.message}`);
    }
}

async function getWarehouseCapacity(id) {
    try {
        const warehouse = await Warehouse.findById(id);
        if (!warehouse) {
            throw new Error('Warehouse not found');
        }
        
        return {
            capacity: warehouse.capacity,
            currentParcels: warehouse.receivedParcels.length,
            availableSpace: warehouse.capacity.parcels - warehouse.receivedParcels.length
        };
    } catch (error) {
        throw new Error(`Error fetching warehouse capacity: ${error.message}`);
    }
}

module.exports = {
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
};