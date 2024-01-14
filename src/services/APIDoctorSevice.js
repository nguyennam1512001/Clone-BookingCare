const db = require('../models/index')


let getDoctors = (limit, pageNumber) => {
    return new Promise(async(resolve, reject)=>{
        try {
            let userData = await db.User.findAndCountAll({
                limit: limit,
                offset: (pageNumber - 1) * limit,
                where: {roleId: 'R2'},
                order: [['createdAt', 'DESC']],
                attributes: {exclude : ['password']},
                include:[
                    {model: db.Allcode, as:'positionData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as:'genderData', attributes: ['valueEn', 'valueVi']}
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode:0,
                data: userData.rows,
                pageSize: limit,
                pageNumber: pageNumber,
                total: userData.count,
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {getDoctors}