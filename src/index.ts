import express from 'express'
import { authMiddleware, loginMiddleware } from './auth'
import db from './db'
import createUserMiddleware from './middleware/users/create_user'
import userController from './middleware/users'
import deviceController from './middleware/devices'


const server = express()
const port = 3000

server.use(express.json())

db.connect()
    .then(() => console.log('[DB] MONGODB CONECTADO'))
    .catch((e) => {
        console.log(`[DB] OCORREU UM ERRO AO CONECTAR: ${e}`)
        // Caso não for possível conectar-se ao MongoDb Atlas, o processo é finalizado imediatamente e é exibido o erro que ocorreu.
        process.exit(1)
    })

// Rota para os usuários fazerem o login
server.post('/user/login', loginMiddleware)

// Rota para criação de usuários novos
server.post('/user/create', createUserMiddleware)

// Todas as requisições serão verificadas antes de prosseguirem
server.use(authMiddleware) // Decodifica o token e valida as informações contidas nele, depois chama a NextFunction
server.use(userController)
server.use(deviceController)


server.listen(port, () => console.log('[SERVER] SERVER RUNNING AT', port))