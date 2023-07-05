const express = require('express')
const router = express.Router()
const db = require('../models/index')

// middleware that is specific to this router
router.use((req, res, next) => {
  next()
})
// define the home page route
router.get('/', async(req, res) => {
  try{
    let data = await db.User.findAll();
    res.send('Weicome to chat not gpt server!')
  }catch(e){
    console.log(e)
  }
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router