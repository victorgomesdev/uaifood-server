import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { authMiddleware, loginMiddleware } from './auth'
import env from '../env.json'
import Db from './db'
import createUserMiddleware from './middleware/create_user'
import editUserMiddleware from './middleware/edit_user'
import createDeviceMiddleware from './middleware/create_device'

const server = express()
const port = 3000
server.use(bodyParser.json())

const db = new Db() // Cria uma instância da classe Db que irá representar a conexão com o MongoDb Atlas.

db.connect()
    .then(() => console.log('[DB] MONGODB CONECTADO'))
    .catch((e) => {
        console.log(`[DB] OCORREU UM ERRO AO CONECTAR: ${e}`)
        // Caso não for possível conectar-se ao MongoDb Atlas, o processo é finalizado imediatamente e é exibido o erro que ocorreu.
        process.exit()
    })

// Rota para os usuários fazerem o login
server.post('/user/login', (rq: Request, rs: Response) => {
    loginMiddleware(rq, rs, db) // Verifica as informações fornecidas na requisição e gera um token de acesso JWT.
})

// Rota para criação de usuários novos
server.post('/user/create', (req: Request, res: Response) => {
    createUserMiddleware(req, res, db)
})

// Todas as requisições serão verificadas antes de prosseguirem
server.use((req, res, next) => authMiddleware(req, res, next, db)) // Decodifica o token e valida as informações contidas nele, depois chama a NextFunction

// Rota para editar os dados de um usuário
server.post('/user/edit', (req: Request, res: Response, next: NextFunction) => {
    editUserMiddleware(req, res, next, db)
},
    async (req: Request, res: Response) => { // Após a atualização dos dados, é feita uma busca para se retornar os novos

        const data = await db.getUserData(req.body.email)

        res.status(200)
            .setHeader("Content-Type", 'application/json')
            .json({ _id: data._id, name: data.name, email: data.email })
    }
)

server.post('device/create', (req: Request, res: Response) => createDeviceMiddleware(req, res, db))
server.listen(port, () => console.log('[SERVER] SERVER RUNNING AT', port))