const express = require("express"); //commonjs
const homePageController = require('../controllers/homePageController')
const CRUDController = require('../controllers/CRUDController')
const userController = require('../controllers/userController')
const doctorController = require('../controllers/doctorController')

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
        //--User--
    router.post('/api/login', userController.handleLogin)   // login
    router.post('/api/create-user', userController.handleCreateUser)       // create
    router.get('/api/users', userController.handleGetUsers)       // read
    router.put('/api/edit-user', userController.handleUpdateUser)       // update
    router.delete('/api/delete-user/:id', userController.handleDeleteUser)       // delete
        // --Doctor--
    router.get('/api/doctors', doctorController.handleGetDoctors)

    router.get('/api/allcode', userController.getAllCode)
    return app.use('/',router)
}

module.exports = initWebRouter