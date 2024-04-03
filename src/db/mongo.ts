import { MongoClient } from 'mongodb'
import * as env from '../../env.json'

export default class Db {

    private connection
    private database

    constructor(url: string) {
        this.connection = new MongoClient(url)
        this.database = this.connection.db('Uaifood')
    }

    async connect() {

        try {
            await this.connection.connect()
                .then(() => console.log('MONGODB CONECTADO'))
        } catch (e) {

            console.warn(`NÃO FOI POSSÍVEL CONECTAR DEVIDO: ${e}`)
            process.exit()
        }
    }

    async addUser(user: CreateUserProps) {

        const users = this.database.collection<CreateUserProps>('users')

        await users.insertOne(user)
            .then((inser) => console.log(`Usuário: ${user.name} foi adicionado _id: ${inser.insertedId}`))
            .catch(()=> {
                console.log('Não foi possível cadastrar-se')
            })
    }

    async getUserData(){


    }
}