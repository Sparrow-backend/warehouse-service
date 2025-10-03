const express = require('express');
const cors = require('cors');

const warehouseRouter = require('./routes/warehouse/warehouse.router');
const inventoryRouter = require('./routes/inventory/inventory.router');
const addressRouter = require('./routes/address/address.router');

const app = express();

app.use(cors({
    origin: [
        'https://sparrow.nivakaran.dev',
        'http://localhost:3000',
        'http://nivakaran.dev'
    ]
}));

app.use(express.json());

// Base routes
app.get('/', (req, res) => {
    res.json({message: "Sparrow: Warehouse Service"});
});

app.get('/health', (req, res) => {
    res.json({message: "Warehouse Service is running.."});
});

// API routes
app.use('/warehouses', warehouseRouter);
app.use('/inventory', inventoryRouter);
app.use('/addresses', addressRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app;