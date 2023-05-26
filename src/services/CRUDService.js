const db = require('../models/index')
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* let createNewUser = async(data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let hashPasswordFromBcript = await hashUserPassword(data.password);
            console.log(hashPasswordFromBcript);
            // sequelize create (await)
            resolve('Create a new user success');
        }catch(e){
            reject(e)
        }
    })
} */

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, saltRounds);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = await db.User.findAll({
                raw: true
            });
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}

let getUserById = (id) => {

}



module.exports = {/* 
    createNewUser: createNewUser, */
    getUserById: getUserById,
    getAllUser: getAllUser,
    hashUserPassword: hashUserPassword
}