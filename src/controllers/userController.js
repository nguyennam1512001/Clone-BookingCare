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

let getUsers = async(req,res)=>{
    let id = req.body.id; //all, id
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

module.exports = {handleLogin, getUsers}