var bcrypt = require('bcryptjs');
const db = require('../models/index')
var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1'? true: false,
                roleId: data.roleId,
            })
            resolve('oki! create success')
        } catch (error) {
            reject(error)
        }
    })
}


let getAllUser = ()=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let users = db.User.findAll({raw:true})
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let hashUserPassword = (password)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {createNewUser, getAllUser}