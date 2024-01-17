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


let getAllDoctor = () => {
    return new Promise(async(resolve, reject)=>{
        try {
            let userData = await db.User.findAndCountAll({
                where: {roleId: 'R2'},
                order: [['createdAt', 'DESC']],
                attributes: {exclude : ['password','image']},
                // include:[
                //     {model: db.Allcode, as:'positionData', attributes: ['valueEn', 'valueVi']},
                //     {model: db.Allcode, as:'genderData', attributes: ['valueEn', 'valueVi']}
                // ],
                raw: true,
                nest: true
            })
            resolve({
                errCode:0,
                data: userData.rows,
                total: userData.count,
            })
        } catch (error) {
            reject(error)
        }
    })
}


let saveDetailInforDoctor = (data)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            if(!data.doctorId || !data.contentHTML || !data.contentMarkdown){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else{
                await db.Markdown.create({
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    description: data.description,
                    doctorId: data.doctorId
                })
                resolve({
                    errCode: 0,
                    message: 'Save infor doctor success'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailDoctor = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            if(!id){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing prameter'
                })
            } else{
                let data = await db.User.findOne({
                    where: {id: id},
                    order: [['createdAt', 'DESC']],
                    attributes: {exclude : ['password']},
                    include:[
                        {model: db.Allcode, as:'positionData', attributes: ['valueEn', 'valueVi']},
                        {model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown']}
                    ],
                    raw: true,
                    nest: true
                })
                if(!data){
                    resolve({
                        errCode: 1,
                        errMessage: 'Not found Doctor'
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {getDoctors, getAllDoctor, saveDetailInforDoctor, getDetailDoctor}