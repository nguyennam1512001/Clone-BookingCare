const express = require("express"); //commonjs
const cors = require('cors')
const bodyParser = require('body-parser')

const initWebRoute = require("./routes/web");
const configViewEngine = require("./configs/viewEngine");
const connectDB = require('./configs/connectDB')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

app.use(function (req, res, next){
  res.setHeader(`Access-Control-Allow-Origin`, process.env.URL_REACT);
  res.setHeader(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.setHeader(`Access-Control-Allow-Headers`, `Content-Type,Content-Length, Authorization, Accept,X-Requested-With`);
  res.setHeader(`Access-Control-Allow-Credentials`, true)
  next();
})

// config req.body
// app.use(bodyParser.json()); // for json
// app.use(bodyParser.urlencoded({ extended: true })); // for form data
app.use(bodyParser.json({limit:'50mb'})); // for json
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true })); // for form data
//config template engine
configViewEngine(app)

// init web router
initWebRoute(app)

connectDB()

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
  });