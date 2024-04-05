import { MongoClient } from 'mongodb'
import env from '../../env.json' with {type: 'json'}

export default class Db {

    private connection
    private database
    private users
    private devices

    constructor() {
        this.connection = new MongoClient(env.DATABASE_URL)
        this.database = this.connection.db('Uaifood')
        this.users = this.database.collection<UserProps>('users')
        this.devices = this.database.collection<DeviceProps>('devices')
    }

    async connect() {

        await this.connection.connect()
            .then(() => console.log('[DB_CONNECT]MONGODB CONECTADO'))
            .catch((e) => {

                console.warn(`[DB_CONNECTION]NÃO FOI POSSÍVEL CONECTAR DEVIDO: ${e}`)
                process.exit()
            })

    }

    async addUser(user: UserProps) {

        return await this.users.insertOne(user)
            .then((inser) => console.log(`Usuário: ${user.name} foi adicionado _id: ${inser.insertedId}`))
            .catch((error) => {
                console.log(`[ADD_USER]NÃO FOI POSSÍVEL CADASTRAR DEVIDO: ${error}`)
            })
    }

    async getUserData(email: string) {

        return await this.users.findOne({ email: email })
            .catch((error) => console.log('[GET_USER_DATA]Ocoreu um erro:', error))

    }

    async addDevice(device: DeviceProps) {

        return await this.devices.insertOne(device)
            .then(() => console.log(`[ADD_DEVICE] ROBÔ ${device.name} ADICIONADO, ID:${device._id}`))
            .catch(error => console.log(`[ADD_DEVICE]NÃO FOI POSSÍVEL ADICIONAR O ROBÔ DEVIDO:${error}`))
    }

    async getDeviceData(owner: number, id: number) {

        return await this.devices.findOne({ owner_id: owner, _id: id })
            .catch((error) => console.log('[GET_USER_DATA]Ocoreu um erro:', error))
    }
}
