import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { authMiddleware, loginMiddleware } from './auth'
import env from '../env.json'
import Db from './db'
import createUserMiddleware from './db/create_user'

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
server.post('/user/login', (rq: Request, rs: Response) => {
    loginMiddleware(rq, rs, db)
})

server.post('/user/create', (req: Request, res: Response)=>{
    createUserMiddleware(req, res, db)
})

// Todas as requisições serão verificadas antes de prosseguirem
//server.use(authMiddleware)
server.post('/teste')
server.listen(3000, () => console.log('[SERVER] SERVER RUNNING AT 3000'))
