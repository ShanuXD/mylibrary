if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    dotenv.config()
}


const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const app = express()

const indexRouter = require('./routes/index')

app.set("view engine", "ejs")
app.set('views', __dirname + "/views")
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', function(err) {
    console.log("ERROR")
})
db.once('open', function() {
    console.log('connected to mongoose')
})

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, function() {
    console.log("Sever Running")
})