const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port,hostname, () => {
  console.log(`Example app listening on port ${port}`)
})