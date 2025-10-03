const express = require('express');
const {
    httpCreateAddress,
    httpGetAddressById,
    httpGetAllAddresses,
    httpUpdateAddress,
    httpDeleteAddress
} = require('./address.controller');

const addressRouter = express.Router();

// Get all addresses
addressRouter.get('/', httpGetAllAddresses);

// Get address by ID
addressRouter.get('/:id', httpGetAddressById);

// Create new address
addressRouter.post('/', httpCreateAddress);

// Update address
addressRouter.put('/:id', httpUpdateAddress);

// Delete address
addressRouter.delete('/:id', httpDeleteAddress);

module.exports = addressRouter;