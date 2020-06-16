const express = require('express')
const r = express.Router()
module.exports = r

const home = require('./controllers/home')
const himom = require('./controllers/himom')

r.get('/helloworld', home.index)
r.get('/himom', himom.index)
