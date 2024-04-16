import { MongoClient } from 'mongodb'
import env from '../../env.json' 
import { UserProps } from '../types'
import { DeviceProps } from '../types'

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

    }

    async addUser(user: UserProps) {

        return await this.users.insertOne(user)
    }

    async getUserData(email: string) {

        return await this.users.findOne({ email: email })

    }

    async addDevice(device: DeviceProps) {

        return await this.devices.insertOne(device)
    }

    async getDeviceData(owner: number, id: number) {

        return await this.devices.findOne({ owner_id: owner, _id: id })
    }

    async editUser(newData: UserProps){

        return await this.users.updateOne({_id: newData._id}, {
            $set:{
                name: newData.name,
                email: newData.email,
                password: newData.password
            }
        })
    }
}
