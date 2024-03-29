const APIDoctorSevice = require('../services/APIDoctorSevice')


let handleGetDoctors = async(req,res)=>{
    let limit = req.query.limit
    let pageNumber = req.query.pageNumber
    if(!limit) limit = 5
    if(!pageNumber) pageNumber = 1
    try {
        let response = await APIDoctorSevice.getDoctors(+limit, +pageNumber)
        return res.status(200).json({response})
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from server...',
        })
    }
}

let handleGetAllDoctor = async(req,res)=>{
    try {
        let response = await APIDoctorSevice.getAllDoctor()
        return res.status(200).json({response})
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from server...',
        })
    }
}

let handlePostInforDoctor = async (req, res)=>{
    try {
        let response = await APIDoctorSevice.saveDetailInforDoctor(req.body)
        return res.status(200).json({response})
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from server...'
        })
    }
}

let handleGetDetailDoctor= async(req, res)=>{
    try {
        if(!req.query.id){
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Missing parameter'
            })
        }
        let response = await APIDoctorSevice.getDetailDoctor(req.query.id)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from server...'
        })
    }
}

let handleGetAllDetailDoctor = async(req, res) =>{
    try {
        let res = await APIDoctorSevice.getAllDetailDoctor()
        return res.status(200).json(res)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let handleUpdateDetailDoctor= async(req, res)=>{
    try {
        let response = await APIDoctorSevice.updateDetailDoctor(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from server...'
        })
    }
}

module.exports = {handleGetDoctors, handleGetAllDoctor, handlePostInforDoctor, handleGetDetailDoctor, handleUpdateDetailDoctor, handleGetAllDetailDoctor}