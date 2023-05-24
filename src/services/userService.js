const db = require('../models/index')
const bcrypt = require('bcrypt');

let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUsername(username);
            if (isExist) {
                //User Already exist

                let user = await db.User.findOne({
                    raw: true,
                    where: { username: username }
                })
                if (user) {
                    //Compare Password
                    let check = await bcrypt.compare( password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = `Okay!`;
                        delete user.password;
                        userData.user = user;
                        resolve(userData)
                    }else{
                        userData.errCode = 3;
                        userData.message = `Wrong password`;
                        resolve(userData)
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = `User's not found`;
                    resolve(userData);
                }
            } else {
                //Return error
                userData.errCode = 2;
                userData.message = `User's not found`;
                resolve(userData);
            }
        } catch (e) {
            reject(e)
        }
    })
}

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { username: username }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUser = (userId) => {
    return new Promise((resolve, reject) => {
        try{
            let users = '';
            if(userId === 'ALL'){
                users = db.User.findAll({
                    attributes: { exclude: ['password'] }
                })
            }else if(userId && userId !== 'ALL'){
                users = db.User.findOne({
                    where: { id: userId },
                    attributes: { exclude: ['password'] }
                })
            }
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser
}