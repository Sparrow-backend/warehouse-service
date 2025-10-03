const express = require('express');
const {
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
} = require('./warehouse.controller');

const warehouseRouter = express.Router();

// Get all warehouses
warehouseRouter.get('/', httpGetAllWarehouses);

// Get active warehouses
warehouseRouter.get('/active', httpGetActiveWarehouses);

// Get warehouse by ID
warehouseRouter.get('/:id', httpGetWarehouseById);

// Get warehouse by code
warehouseRouter.get('/code/:code', httpGetWarehouseByCode);

// Get warehouse capacity
warehouseRouter.get('/:id/capacity', httpGetWarehouseCapacity);

// Create new warehouse
warehouseRouter.post('/', httpCreateWarehouse);

// Update warehouse
warehouseRouter.put('/:id', httpUpdateWarehouse);

// Update warehouse status
warehouseRouter.patch('/:id/status', httpUpdateWarehouseStatus);

// Add parcel to warehouse
warehouseRouter.patch('/:id/add-parcel', httpAddParcelToWarehouse);

// Remove parcel from warehouse
warehouseRouter.patch('/:id/remove-parcel', httpRemoveParcelFromWarehouse);

// Delete warehouse
warehouseRouter.delete('/:id', httpDeleteWarehouse);

module.exports = warehouseRouter;