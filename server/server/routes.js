const express = require('express')
const r = express.Router()
module.exports = r

const home = require('./controllers/home')
const himom = require('./controllers/himom')

//routes that use Room MongoDB Model
const newRoom = require('../api/newRoom')
const deleteRoom = require('../api/deleteRoom')
const joinRoom = require('../api/joinRoom')
const addToTeam = require('../api/addToTeam')
const getStartGame = require('../api/getStartGame')
const setStartGame = require('../api/setStartGame')
const getCode = require('../api/getCode')
const getMyWords = require('../api/getMyWords')
const saveWords = require('../api/saveWords')

//routes that use Words MongoDB Model
const getWords = require('../api/getWords')


//I like turtles
r.get('/helloworld', home.index)
r.get('/himom', himom.index) //Hi sgt noodle.

//routes that use Room MonogDB Model
r.get('/newRoom', newRoom.index)
r.get('/deleteRoom', deleteRoom.index)
r.get('/joinRoom', joinRoom.index)
r.get('/addToTeam', addToTeam.index)
r.post('/getStartGame', getStartGame.index)
r.post('/setStartGame', setStartGame.index)
r.post('/getCode', getCode.index)
r.get('/getMyWords', getMyWords.index)
r.post('/saveWords', saveWords.index)

//routes that use Words MongoDB Model
r.get('/getWords', getWords.index)