const express = require('express')
const router = express.Router()
const db = require('../models/index')
const APIControler = require('../controllers/APIControlers')
const conversationControler = require('../controllers/conversationControler')
const messageControler = require('../controllers/messageControler')
var cors = require('cors')
const multer = require('multer');
const path = require('path');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

//handle store avatar user
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './src/public/images')
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })



// middleware that is specific to this router
const initAPI = (app) => {
    // API User handle
    router.post('/login', APIControler.handleLogin);
    router.post('/auth',APIControler.handleAuth);
    router.get('/users', APIControler.handleGetAllUser);
    router.post('/create-new-user', APIControler.handleCreateNewUser);
    router.put('/edit-user', upload.single('image') ,APIControler.handleEditUser);
    router.delete('/delete-user', APIControler.handleDeleteUser);
    router.get('/search-users/:search_query', APIControler.handleSearchUsers);

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