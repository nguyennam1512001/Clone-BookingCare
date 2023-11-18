const express = require("express"); //commonjs
const homePageController = require('../controllers/homePageController')
const CRUDController = require('../controllers/CRUDController')
const userController = require('../controllers/userController')

let router = express.Router()
let initWebRouter = (app)=>{
    router.get('/', homePageController.getHomePage)
    router.get('/crud', CRUDController.getCRUDPage)
    router.get('/update_user', CRUDController.getUpdateUserPage)
    
    router.post('/post-crud', CRUDController.postCRUD)
    router.get('/get-crud', CRUDController.getCRUD)
    router.post('/put_crud', CRUDController.putCRUD)
    router.get('/delete_crud', CRUDController.deleteCRUD)

    // API ================
    router.post('/api/login', userController.handleLogin)
    router.get('/api/users', userController.getUsers)

    return app.use('/',router)
}

module.exports = initWebRouter