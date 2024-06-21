import { Router } from 'express'
import createDeviceMiddleware from './create_device'
import remoteControlMiddleware from './control'
import listDevices from './list'

const deviceController = Router()

deviceController.post('/device/create', createDeviceMiddleware)
deviceController.post('/device/control', remoteControlMiddleware)
deviceController.post('/device/list', listDevices)
export default deviceController