type UserProps = {
    _id?: number
    name: string
    email: string
    password: string
}

type DeviceProps = {
    _id?: number
    code: number
    name: string
    description: string
    owner_id: number
}

type LoginReq = {
    email: string
    password: string
}