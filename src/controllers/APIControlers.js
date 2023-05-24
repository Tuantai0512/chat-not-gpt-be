const CRUDServices = require('../services/CRUDService');
const userServices = require('../services/userService')

let handleLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    //Check username exist
    let userData = await userServices.handleUserLogin(username, password);
    //Compare password
    //Return UserIn4
    //Ascess token:
    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameters',
        });
    }
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user
    });
}

let handleGetAllUser = async (req, res) => {
    let id = req.body.id; //ALL, SINGLE
    let users = await userServices.getAllUser(id);
    if(!id){
        return res.status(200).json({
            errCode: 0,
            message: 'Missing inputs parameters',
            users: users,
        })
    }else{
        return res.status(200).json({
            errCode: 0,
            message: 'Okay!',
            users: users,
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser
}