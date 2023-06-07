const db = require('../models/index')
const bcrypt = require('bcrypt');
const { hashUserPassword } = require('./CRUDService')
const { createJWT } = require('../middlewares/auth')

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
                    let check = await bcrypt.compare(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = `Okay!`;
                        delete user.password;
                        userData.user = user;
                        userData.token = createJWT(user);
                        resolve(userData)
                    } else {
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
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.User.findAll({
                    attributes: { exclude: ['password'] }
                })
            } else if (userId && userId !== 'ALL') {
                users = db.User.findOne({
                    where: { id: userId },
                    attributes: { exclude: ['password'] }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Check username is exist?
            let check = await checkUsername(data.username)
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Ops! Username is already in used.'
                })
            } else {
                let hashPasswordFromBcript = await hashUserPassword(data.password);
                await db.User.create({
                    username: data.username,
                    password: hashPasswordFromBcript,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false
                })
                resolve({
                    errCode: 0,
                    message: 'Okay! Create new user success.'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: 'Ops! User is not exist.'
                })
            } else {
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errCode: 0,
                    message: 'Okay! User is deleted.'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    message: 'Missing inputs parameters',
                })
            }else{
                let user = await db.User.findOne({
                    where: { id: data.id },
                    raw: false
                })
                if (user) {
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;

                    await user.save();
                    resolve({
                        errCode: 0,
                        message: 'Okay! User is updated.'
                    })
                } else {
                    resolve({
                        errCode: 3,
                        message: 'User not found.'
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser
}