const express = require("express")
const mongoose = require("mongoose")
const app = express()
const route = require("./route/roiute")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://vishal0102:vishal0102@cluster0.9uryho2.mongodb.net/backend_test", {
    useNewUrlparser: true
}).then(console.log("mongoose is connected"))
    .catch((err) => console.log(err))

app.use("/", route)

app.listen(process.env.port || 3000, () => {
    console.log("Server is running on " + (process.env.port || 3000))
})