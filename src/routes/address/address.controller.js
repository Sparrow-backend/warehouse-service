const {
    createAddress,
    getAddressById,
    updateAddress,
    deleteAddress,
    getAllAddresses
} = require('../../models/address/address.model');

async function httpCreateAddress(req, res) {
    try {
        const addressData = req.body;
        const newAddress = await createAddress(addressData);
        return res.status(201).json({
            success: true,
            data: newAddress,
            message: 'Address created successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetAddressById(req, res) {
    try {
        const { id } = req.params;
        const address = await getAddressById(id);
        
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: address
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpGetAllAddresses(req, res) {
    try {
        const addresses = await getAllAddresses();
        return res.status(200).json({
            success: true,
            count: addresses.length,
            data: addresses
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpUpdateAddress(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedAddress = await updateAddress(id, updateData);
        
        if (!updatedAddress) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: updatedAddress,
            message: 'Address updated successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function httpDeleteAddress(req, res) {
    try {
        const { id } = req.params;
        const deletedAddress = await deleteAddress(id);
        
        if (!deletedAddress) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Address deleted successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    httpCreateAddress,
    httpGetAddressById,
    httpGetAllAddresses,
    httpUpdateAddress,
    httpDeleteAddress
};