const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: [
        'https://sparrow.nivakaran.dev',
        'http://localhost:3000',
        'http://nivakaran.dev'
    ]
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.json({message: "Sparrow: Warehouse Service"})
})

app.get('/health', (req, res) => {
    res.json({message: "Warehouse Service is running.."})
})


module.exports = app