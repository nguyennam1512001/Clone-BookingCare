const CRUDService = require('../services/CRUDService')

const getCRUDPage =(req,res) =>{
    res.render('crud.ejs')
}


const postCRUD = async (req,res) =>{
    let message = await CRUDService.createNewUser(req.body)
    return res.send(message)
}

const getCRUD = async(req, res)=>{
    let data = await CRUDService.getAllUser()

    return res.render('displayCRUD.ejs',{data})
}

module.exports = {getCRUDPage, postCRUD, getCRUD}