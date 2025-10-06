const mongoose = require('mongoose')

const ParcelSchema = new mongoose.Schema({
    trackingNumber: {
        type: String,
        required: true, 
        unique: true
    },
    weight: {
        value: Number,
        unit: {
            type: String,
            enum: ["kg", "g", "lb", "oz"], 
            default: "kg"
        }
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: {
            type: String,
            enum: ["cm", "in"],
            default: "cm"
        }
    },
    sender: {
        name: String,
        phoneNumber: String,
        email: String,
        address: String
    },
    receiver: {
        name: String,
        phoneNumber: String,
        email: String,
        address: String
    },
    status: {
        type: String,
        enum: [
            "created",
            "at_warehouse",
            "consolidated",
            "in_transit",
            "out_for_delivery",
            "delivered",
            "cancelled"
        ],
        default: "created"
    },
    statusHistory: [
        {
            status: String,
            service: String,
            location: String,
            timestamp: {
                type: Date,
                default: Date.now
            },
            note: String
        }
    ],
    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse"
    },
    consolidationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consolidation"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdTimeStamp: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Parcel", ParcelSchema);