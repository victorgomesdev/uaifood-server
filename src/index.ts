import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { authMiddleware, loginMiddleware } from './auth'
import env from '../env.json'
import Db from './db'
import createUserMiddleware from './db/create_user'

const server = express()
server.use(bodyParser.json())

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

server.post('/user/create', (req: Request, res: Response) => {
    createUserMiddleware(req, res, db)
})

// Todas as requisições serão verificadas antes de prosseguirem
server.use((req, res, next) => authMiddleware(req, res, next, db))

server.post('/user/edit', (req: Request, res: Response) => {

    db.editUser(req.body)
        .then(r => {
            if (r.acknowledged) {
                res.status(200)
                    .setHeader("Content-Type", 'application/json')
                    .json(
                        db.getUserData(req.body._id)
                    )
            }
        })
        .catch(e => {
            console.log('[DB] OCORREU UM ERRO AO EDITAR OS DADOS DO USUÁRIO', e)
            res.status(500)
                .setHeader("Content-Type", 'application/json')
                .json({ msg: 'Erro interno do servidor' })
        })
})
server.listen(3000, () => console.log('[SERVER] SERVER RUNNING AT 3000'))
