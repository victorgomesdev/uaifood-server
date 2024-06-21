export type UserProps = {
    _id?: number
    name: string
    email: string
    password?: string
    slug?: string
}

export type DeviceProps = {
    _id?: string
    code: number
    name: string
    description: string
    owner_id: string
    imageUrl: string
}

export type LoginReq = {
    email: string
    password: string
}

export type Token = {
    eml: string
    nam: string
}