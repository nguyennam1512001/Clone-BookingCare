const express = require("express"); //commonjs
const bodyParser = require('body-parser')

const initWebRoute = require("./routes/web");
const configViewEngine = require("./configs/viewEngine");
const connectDB = require('./configs/connectDB')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

// config req.body
app.use(bodyParser.json()); // for json
app.use(bodyParser.urlencoded({ extended: true })); // for form data
//config template engine
configViewEngine(app)

// init web router
initWebRoute(app)

connectDB()

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
  });