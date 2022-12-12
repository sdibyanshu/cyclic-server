const express = require("express")
const cors = require("cors")
const connection = require("./config/db")
const userController = require("./routes/user.routes")
const notesController = require("./routes/notes.routes")
const authentication = require("./middlewares/authentication")

require('dotenv').config()


const app = express() 
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.send("Home page")
})

// middlewares
app.use("/user", userController)
app.use(authentication)
app.use("/todos", notesController)

app.listen(process.env.Port, async () => {
    try{
        await connection
        console.log("DB connected")
    }
    catch(err){
        console.log(err)
        console.log("error is reading ")
    }
    console.log(`Listning on port ${process.env.Port}`)
})


// http://localhost:8080/todos/create/

//   {
//  "taskname":"task one",
//  "status":"pending",
//  "tag":"ok",
//  "userID":"639634ccdd0e05dde3ad6238"
//  }