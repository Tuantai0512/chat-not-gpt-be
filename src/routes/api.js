const express = require('express')
const router = express.Router()
const db = require('../models/index')
const APIControler = require('../controllers/APIControlers')
var cors = require('cors')

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}



// middleware that is specific to this router
const initAPI = (app) => {
    // define the home page route
    router.post('/login', APIControler.handleLogin);
    router.post('/auth',APIControler.handleAuth);
    router.get('/users', APIControler.handleGetAllUser);
    router.post('/create-new-user', APIControler.handleCreateNewUser);
    router.put('/edit-user', APIControler.handleEditUser);
    router.delete('/delete-user', APIControler.handleDeleteUser);
    return app.use('/api/v1', cors(corsOptions) ,router)
}

// define the about route

module.exports = initAPI