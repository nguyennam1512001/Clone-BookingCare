const CRUDService = require('../services/CRUDService')

const getCRUDPage =(req,res) =>{
    return res.render('crud.ejs')
}
const getUpdateUserPage = async (req,res)=>{
    let userId = req.params.id
    if (userId) {
        let user = await CRUDService.getUserById(userId)
        return res.render('updateUsePage.ejs',{user})
    }else{
        return res.send('user not found')
    }
}


const postCRUD = async (req,res) =>{
    let message = await CRUDService.createNewUser(req.body)
    return res.send(message)
}

const getCRUD = async(req, res)=>{
    let data = await CRUDService.getAllUser()

    return res.render('displayCRUD.ejs',{data})
}

const putCRUD = async(req, res)=>{
    let data = req.body
    let allUser = await CRUDService.updateUser(data)

    return res.render('displayCRUD.ejs', {data: allUser})
}

module.exports = {getCRUDPage, postCRUD, getCRUD, getUpdateUserPage, putCRUD}