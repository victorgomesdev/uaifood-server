import express from 'express'
import bodyParser from 'body-parser'
import loginMiddleware from './auth/login'
import authMiddleware from './auth/auth'
import env from '../env.json' with {type: 'json'}
import Db from './db/mongo'

const server = express()
server.use(bodyParser.json())

const db = new Db()

db.connect()
    .then(() => console.log('[DB] MONGODB CONECTADO'))
    .catch((e) => {
        console.log(`[DB] OCORREU UM ERRO AO CONECTAR: ${e}`)
        process.exit()
    })

    
//Login de usuário



server.listen(3000, () => console.log('SERVER RUNNING'))
