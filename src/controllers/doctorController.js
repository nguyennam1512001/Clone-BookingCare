const APIDoctorSevice = require('../services/APIDoctorSevice')


let handleGetDoctors = async(req,res)=>{
    let limit = req.query.limit
    let pageSize = req.query.pageSize
    if(!limit) limit = 5
    if(!pageSize) pageSize = 1
    try {
        let response = await APIDoctorSevice.getDoctors(+limit, +pageSize)
        return res.status(200).json({response})
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Err from server...',
        })
    }
}

module.exports = {handleGetDoctors}