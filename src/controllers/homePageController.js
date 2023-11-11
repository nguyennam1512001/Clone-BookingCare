const db = require('../models/index')
const getHomePage = async(req, res) =>{
    try {
        let data = await db.User.findAll()
        return res.render('homePage.ejs', {data})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getHomePage}