// import express from 'express'
// import bodyParser from 'body-parser'
// import loginMiddleware from './auth/login'

// const server = express()
// server.use(bodyParser.json())

// //Login de usuário
// server.post('/login', loginMiddleware)


// server.listen(3000, ()=> console.log('SERVER RUNNING'))

import Db from "./db/mongo.js";
const de = new Db('mongodb+srv://uaifood-server:uaifood2024@uaifood-server.pzhenlk.mongodb.net/?retryWrites=true&w=majority&appName=Uaifood')

de.connect()