const Address = require('./address.mongo');

async function createAddress(addressData) {
    try {
        const address = new Address(addressData);
        await address.save();
        return address;
    } catch (error) {
        throw new Error(`Error creating address: ${error.message}`);
    }
}

async function getAddressById(id) {
    try {
        return await Address.findById(id);
    } catch (error) {
        throw new Error(`Error fetching address: ${error.message}`);
    }
}

async function updateAddress(id, updateData) {
    try {
        updateData.updatedTimestamp = Date.now();
        return await Address.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
    } catch (error) {
        throw new Error(`Error updating address: ${error.message}`);
    }
}

async function deleteAddress(id) {
    try {
        return await Address.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting address: ${error.message}`);
    }
}

async function getAllAddresses() {
    try {
        return await Address.find({});
    } catch (error) {
        throw new Error(`Error fetching addresses: ${error.message}`);
    }
}

module.exports = {
    createAddress,
    getAddressById,
    updateAddress,
    deleteAddress,
    getAllAddresses
};