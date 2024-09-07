// DBConnectionHandler.js
require("dotenv").config();
const mongoose = require("mongoose");

// async function DBConnectionHandler() {
//     try {
//         await mongoose.connect(process.env.DB_STRING, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("DB connected successfully");
//     } catch (err) {
//         console.log(`There is an error id DB: ${err.message}`);
//     }
// }

async function DBConnectionHandler() {
    try {
        const DB_OPTIONS = {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            pass: process.env.DB_PASSWORD,
            useNewUrlParser: true, //required to connect db in dev. mode
            useUnifiedTopology: true, //required to connect db in dev. mode
        };
        await mongoose.connect(process.env.DB_URL, DB_OPTIONS);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connection failed:", error);
    }
}

module.exports = DBConnectionHandler;
