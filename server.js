const http = require('http')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./src/app')

dotenv.config()

const PORT = process.env.PORT || 8004
const MONGODB_URI = process.env.MONGODB_URI

const server = http.createServer(app)

mongoose.connection.once('open', () => {
    console.log('MongoDB is ready!')
})

mongoose.connection.on('error', () => {
    console.log("Error in connecting with MongoDB!")
})

async function createServer() {
    try {

        mongoose.connect(MONGODB_URI)
        console.log('Connnected to MongoDB!')

        server.listen(PORT, () => {
            console.log(`Warehouse Service: Listening on port ${PORT}..`)
        })

    } catch(err) {
        console.error('Warehouse Service: Internal server error', err)
    }
}

createServer()