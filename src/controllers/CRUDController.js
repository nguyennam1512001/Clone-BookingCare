const CRUDService = require('../services/CRUDService')

const getCRUDPage =(req,res) =>{
    return res.render('crud.ejs')
}
const getUpdateUserPage = async (req,res)=>{
    let userId = req.query.id
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

const deleteCRUD = async (req, res)=>{
    let id = req.query.id
    if(id){
         await CRUDService.deleteUser(id)
        return res.send('oke delete')
    }else{
        return res.send('error delete')
    }
}

module.exports = {getCRUDPage, postCRUD, getCRUD, getUpdateUserPage, putCRUD, deleteCRUD}