// CONNECTIONS RELATED SECTION

const mongoose = require("mongoose")
require('dotenv').config()

const connection = mongoose.connect(process.env.Mongo_url) 
console.log(process.env.MONGOCONNECT)
module.exports = connection