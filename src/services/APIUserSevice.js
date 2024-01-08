const db = require('../models/index')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);


let handleUserLogin = async(email, password)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let userData = {}
            let isExit = await checkUserEmail(email)
            if(isExit){
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes:['email', 'roleId', 'password', 'firstName', 'lastName'],
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

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let arr = Object.keys(data);
            for (let i = 0; i < arr.length; i++) {
                if(!data[arr[i]] || !data[arr[i]].trim()){
                    resolve({
                        errCode: 1,
                        errMessage: `Please enter your ${arr[i]}`
                    })
                    return;
                } 
            }

            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'This email address is already in use'
                });
            } else {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
                if (/\s/.test(data.password)) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Password should not contain spaces.'
                    });
                    return; 
                }
                if (!passwordRegex.test(data.password.trim())) {
                    resolve({
                        errCode: 1,
                        errMessage: 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
                    });
                    return; 
                }
                
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                
                await db.User.create({
                    email: data.email.trim(),
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    address: data.address.trim(),
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    positionId: data.positionId,
                    roleId: data.roleId,
                });

                resolve({
                    errCode: 0,
                    message: 'Added user successfully'
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getUsers =(userId)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let userData = ''
            if(userId === 'all'){
                userData = await db.User.findAll({
                    attributes: {exclude : ['password']},
                })


            }
            if(userId && userId !== 'all'){
                userData = await db.User.findOne({
                    where: {id : userId},
                    attributes: {exclude : ['password']},
                    raw: true
                })
            }

            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameter"
                });
            } else{
                let user = await db.User.findOne({ where: { id: data.id } });
    
                if (user) {
                    // Create an instance of the model
                    const userModelInstance = db.User.build(user, { isNewRecord: false });
    
                    userModelInstance.firstName = data.firstName;
                    userModelInstance.lastName = data.lastName;
                    userModelInstance.address = data.address;
                    userModelInstance.gender = data.gender === 'male' ? 1 : 0;
    
                    await userModelInstance.save();
    
                    resolve({
                        errCode: 0,
                        message: 'Update user success!'
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'User does not exist'
                    });
                }
            }

        } catch (e) {
            reject(e);
        }
    });
};



let deleteUser = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {id:id},
                raw: false
            })
            if(!user){
                resolve({
                    errCode: 2,
                    errMessage: `User does not exist`
                })
            }
            await db.User.destroy({where: {id:id}})
            resolve({
                errCode: 0,
                message: 'delete user success'
            })
        } catch (e) {
            reject(e)
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

let getAllCodeService = (typeInput)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter"
                })
            }else{
                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: {type: typeInput}
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {handleUserLogin, createNewUser, getUsers, deleteUser, updateUser, getAllCodeService}