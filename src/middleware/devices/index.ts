import { Router } from 'express'
import createDeviceMiddleware from './create_device'

const deviceController = Router()

deviceController.post('/device/create', createDeviceMiddleware)

export default deviceController