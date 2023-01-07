require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/userRoutes')

//app
const app = express();

//middleware
app.use(express.json())

//routes
app.use('/api/routes', routes)

//db connection
const startServer = async () => {
    console.log('before connection')
    const connection =  await mongoose.connect(process.env.MONGO_URI)
    if(connection) {
        console.log('db-> connected')
        app.listen(process.env.PORT, ()=> console.log("Running on port 3001"))
    }
}

startServer()