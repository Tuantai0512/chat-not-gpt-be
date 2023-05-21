const express = require('express')
const router = express.Router()
const db = require('../models/index')
const APIControler = require('../controllers/APIControlers')

// middleware that is specific to this router
const initAPI = (app) => {
    // define the home page route
    router.post('/login', APIControler.handleLogin)
    return app.use('/api/v1', router)
}

// define the about route

module.exports = initAPI