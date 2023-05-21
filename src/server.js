require('dotenv').config()
const express = require('express')
const app = express();
const bp = require('body-parser')

var path = require('path');
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME
const webRoutes = require('./routes/web')
const connectDB = require('./config/database')
const initAPI = require('../src/routes/api')
/* const connection = require('./config/database');

connection.execute(
  'SELECT * FROM Users',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
  }
); */

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

connectDB();
initAPI(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRoutes)

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})