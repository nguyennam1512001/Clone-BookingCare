const express = require("express"); //commonjs
const homePageController = require('../controllers/homePageController')
const CRUDController = require('../controllers/CRUDController')

let router = express.Router()
let initWebRouter = (app)=>{
    router.get('/', homePageController.getHomePage)
    router.get('/crud', CRUDController.getCRUDPage)
    router.post('/post-crud', CRUDController.postCRUD)
    router.get('/get-crud', CRUDController.getCRUD)

    return app.use('/',router)
}

module.exports = initWebRouter