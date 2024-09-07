// DBConnectionHandler.js
require("dotenv").config();
const mongoose = require("mongoose");

async function DBConnectionHandler() {
    // {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     }
    try {
        await mongoose.connect(process.env.DB_STRING);
        console.log("DB connected successfully");
    } catch (err) {
        console.log(`There is an error id DB: ${err.message}`);
    }
}

module.exports = DBConnectionHandler;
