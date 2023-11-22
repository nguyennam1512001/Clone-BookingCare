const APIUserSevice = require('../services/APIUserSevice')

let handleLogin = async(req,res)=>{
    let email = req.body.email
    let password = req.body.password
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Please enter email and password'
        })
    }
    let userData = await APIUserSevice.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode ,
        message: userData.errMessage,
        user: userData.user ? userData.user: {}
    })
}

let handleCreateUser = async(req,res)=>{
    let message = await APIUserSevice.createNewUser(req.body)
    return res.status(200).json(message)
}

let handleGetUsers = async(req,res)=>{
    let id = req.query.id; //all, id
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameter',
            user: []
        })
    }
    let userData = await APIUserSevice.getUsers(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users: userData
    })
}

let handleUpdateUser = async(req,res)=>{
    let data = req.body
    let message = await APIUserSevice.updateUser(data)
    return res.status(200).json(message)
}

let handleDeleteUser = async(req,res)=>{
    if(!req.params.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter'
        })
    }
    let message = await APIUserSevice.deleteUser(req.params.id)
    return res.status(200).json(message)
}
module.exports = {handleLogin, handleCreateUser, handleGetUsers, handleUpdateUser, handleDeleteUser}