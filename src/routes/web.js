const express = require("express"); //commonjs
const homePageController = require('../controllers/homePageController')

let router = express.Router()
let initWebRouter = (app)=>{
    router.get('/', homePageController.getHomePage)

    return app.use('/',router)
}

module.exports = initWebRouter