const db = require('../models/index')
const bcrypt = require('bcryptjs')
let handleUserLogin = async(email, password)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let userData = {}
            let isExit = await checkUserEmail(email)
            if(isExit){
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes:['email', 'roleId', 'password'],
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'ok'
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'Password is incorrect'
                    }
                } else{
                    userData.errCode = 2
                    userData.errMessage = 'user not found'
                }
            } else{
                userData.errCode = 1
                userData.errMessage = 'Email is incorrect'
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = async(email) =>{
    return new Promise( async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {email: email}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {handleUserLogin}