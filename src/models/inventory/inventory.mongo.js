
const mongoose = require('mongoose')
require('../warehouse/warehouse.mongo')
require('../parcel/parcel.mongo')

const InventorySchema = new mongoose.Schema({
    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    },
    parcelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parcel",
        required: true
    },
    rack: String,
    bin: String,
    level: String,

    checkInTime: {
        type: Date,
        default: Date.now
    },
    checkOutTime: {
        type: Date
    }, 
    createdTimestamp: {
        type: Date,
        default: Date.now
    },
    updatedTimestamp: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Inventory", InventorySchema)