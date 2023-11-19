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
let getUserById = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = db.User.findOne({ where: { id: id }, raw: true })
            if(user){
                resolve(user)
            }else{
                resolve({})
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUser =(data)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({ where: { id: data.id } });
            if (user) {
                const userModelInstance = db.User.build(user, { isNewRecord: false });
                userModelInstance.firstName = data.firstName
                userModelInstance.lastName = data.lastName
                userModelInstance.address = data.address
                await user.save()
                let allUser = await db.User.findAll()
                resolve(allUser)
            }else{
                resolve()
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } });
            if (user) {
                await db.User.destroy({where: {id: id}});
            } 
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { createNewUser, getAllUser, getUserById, updateUser, deleteUser };


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


module.exports = {createNewUser, getAllUser, getUserById, updateUser, deleteUser}