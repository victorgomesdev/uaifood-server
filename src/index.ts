import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import loginMiddleware from './auth/login'
import authMiddleware from './auth/auth'
import env from '../env.json' with {type: 'json'}
import Db from './db/mongo'

const server = express()
server.use(bodyParser.json()) // Transforma o body de todas as requisições em um json

const db = new Db()

db.connect()
    .then(() => console.log('[DB] MONGODB CONECTADO'))
    .catch((e) => {
        console.log(`[DB] OCORREU UM ERRO AO CONECTAR: ${e}`)
        process.exit()
    })

// Rota para os usuários fazerem o login
server.post('/login', (rq: Request, rs: Response)=>{
    loginMiddleware(rq, rs, db)
})

// Todas as requisições serão verificadas antes de prosseguirem
server.use(authMiddleware)
server.listen(3000, () => console.log('[SERVER] SERVER RUNNING AT 3000'))
