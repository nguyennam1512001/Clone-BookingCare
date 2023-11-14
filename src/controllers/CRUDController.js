const CRUDService = require('../services/CRUDService')

const getCRUD =(req,res) =>{
    res.render('crud.ejs')
}


const postCRUD = async (req,res) =>{
    let message = await CRUDService.createNewUser(req.body)
    return res.send(message)
}

module.exports = {getCRUD, postCRUD}