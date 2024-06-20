import { Router } from 'express'
import createDeviceMiddleware from './create_device'
import remoteControlMiddleware from './control'

const deviceController = Router()

deviceController.post('/device/create', createDeviceMiddleware)
deviceController.post('/device/control', remoteControlMiddleware)

export default deviceController