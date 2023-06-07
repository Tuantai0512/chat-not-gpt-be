var jwt = require('jsonwebtoken');
require('dotenv').config()

const createJWT = (payload) => {
    let token = null;
    try{
        token = jwt.sign(payload, process.env.JWT_LOGIN);
    }catch(err){
        console.log(err)
    }
    return token
}

const verifyJWT = (token) => {
    const key = process.env.JWT_LOGIN;
    let data = null;
    try {
        data = jwt.verify(token, key);
    } catch(err) {
        // err
        console.log(err)
    }
    return data;
}

module.exports = {
    createJWT,verifyJWT
}