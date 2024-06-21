import { Request, Response } from 'express'
import db from '../../db'

export default async function listDevices(req: Request, res: Response) {
    try {
        const devices = await db.listDevices(req.body.ownerId)
        res.setHeader('Content-type', 'application/json')
        
        if (devices.length > 0) {
            res.status(200).json(devices)
        } else {
            res.status(200).json([])
        }
    } catch (e) {
        res.status(500).setHeader('Content-type', 'application/json').json({ error: 'ERR_INTERNALERROR' })
    }
}
