require('dotenv').config()
const express = require("express")
const cors = require("cors");

const errorHandler = require("./middleware/error");

const app = express()

app.use(cors());
app.use(express.json());

//public route 
app.get("/api/v1", (req, res) => {
    res.send("Welcome to Restaurants Finder API V1")
})

//Restaurants route 
app.use('/api/v1/restaurants', require('./routes/restaurants'));

// Error Handler Middleware
app.use(errorHandler);


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})