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

app.use(cors({
  origin: true, // Đặt địa chỉ nguồn của ứng dụng React của bạn
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Cho phép gửi cookie và các header khác khi yêu cầu từ client
  optionsSuccessStatus: 204, // Mã trạng thái thành công cho preflight requests
}));
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