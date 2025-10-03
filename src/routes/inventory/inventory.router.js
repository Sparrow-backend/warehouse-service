const express = require('express');
const {
    httpCreateInventory,
    httpGetInventoryById,
    httpGetInventoryByWarehouse,
    httpGetInventoryByParcel,
    httpGetAllInventory,
    httpGetActiveInventory,
    httpUpdateInventory,
    httpCheckOutParcel,
    httpDeleteInventory
} = require('./inventory.controller');

const inventoryRouter = express.Router();

// Get all inventory
inventoryRouter.get('/', httpGetAllInventory);

// Get active inventory (not checked out)
inventoryRouter.get('/active', httpGetActiveInventory);

// Get inventory by ID
inventoryRouter.get('/:id', httpGetInventoryById);

// Get inventory by warehouse
inventoryRouter.get('/warehouse/:warehouseId', httpGetInventoryByWarehouse);

// Get inventory by parcel
inventoryRouter.get('/parcel/:parcelId', httpGetInventoryByParcel);

// Create new inventory
inventoryRouter.post('/', httpCreateInventory);

// Update inventory
inventoryRouter.put('/:id', httpUpdateInventory);

// Check out parcel
inventoryRouter.patch('/:id/checkout', httpCheckOutParcel);

// Delete inventory
inventoryRouter.delete('/:id', httpDeleteInventory);

module.exports = inventoryRouter;