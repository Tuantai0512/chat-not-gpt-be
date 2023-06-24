const express = require('express')
const router = express.Router()
const db = require('../models/index')
const APIControler = require('../controllers/APIControlers')
const conversationControler = require('../controllers/conversationControler')
const messageControler = require('../controllers/messageControler')
var cors = require('cors')

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}



// middleware that is specific to this router
const initAPI = (app) => {
    // API User handle
    router.post('/login', APIControler.handleLogin);
    router.post('/auth',APIControler.handleAuth);
    router.get('/users', APIControler.handleGetAllUser);
    router.post('/create-new-user', APIControler.handleCreateNewUser);
    router.put('/edit-user', APIControler.handleEditUser);
    router.delete('/delete-user', APIControler.handleDeleteUser);

    // API Conversation handle
    router.post('/conversation',conversationControler.handleCreateNewConversation);
    router.get('/conversation/:userId',conversationControler.handleGetAllConversation);

    // API Message handle
    router.post('/message',messageControler.handleCreateNewMessage);
    router.get('/message/:conversationId', messageControler.handleGetAllMessageByConverId);

    return app.use('/api/v1', cors(corsOptions) ,router)
}

// define the about route

module.exports = initAPI