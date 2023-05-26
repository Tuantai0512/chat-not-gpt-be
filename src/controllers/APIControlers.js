const CRUDService = require('../services/CRUDService');
const CRUDServices = require('../services/CRUDService');
const userService = require('../services/userService');
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
    let id = req.query.id; //ALL, SINGLE
    let users = await userServices.getAllUser(id);
    if(!id){
        return res.status(200).json({
            errCode: 1,
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

let handleCreateNewUser = async(req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log(message)
    return res.status(200).json(message)
}

let handleEditUser = async(req,res) => {
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            message: 'Missing inputs parameters',
        })
    }
    let message = await userService.deleteUser(req.body.id);
    console.log(message)
    return res.status(200).json(message)
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
}