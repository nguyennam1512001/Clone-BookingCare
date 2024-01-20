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

let updateDetailDoctor = (data) =>{
    return new Promise( async (resolve, reject)=>{
        try {
            if(!data.doctorId || !data.contentHTML || !data.contentMarkdown){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else{
                
                let markdown = await db.Markdown.findOne({ where: { doctorId: data.doctorId } });
                if (markdown) {
                    const userModelInstance = db.Markdown.build(markdown, { isNewRecord: false });
                    userModelInstance.contentHTML= data.contentHTML,
                    userModelInstance.contentMarkdown= data.contentMarkdown,
                    userModelInstance.description= data.description.trim(),
                    await userModelInstance.save();
                    resolve({
                        errCode: 0,
                        message: 'Update infor doctor success'
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Record does not exist'
                    });
                }
            } 
        } catch (e) {
            reject(e)
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
                    // raw: true, // => Sequelize Object
                    raw: false, // => javaScript Object
                    nest: true
                })
                if(!data){
                    data = {}
                    resolve({
                        errCode: 1,
                        errMessage: 'Not found Doctor'
                    })
                }
                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('latin1')
                }
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllDetailDoctor = () =>{
    return new Promise(async(resolve, reject)=>{
        try {
            let data = await db.Markdown.findAll()
            resolve({
                errCode: 0,
                message: data
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {getDoctors, getAllDoctor, saveDetailInforDoctor, getDetailDoctor, updateDetailDoctor, getAllDetailDoctor}