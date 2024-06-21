import { Request, Response } from 'express'
import db from '../../db'

export default function listDevices(req: Request, res: Response) {

    db.listDevices(req.body.ownerId)
        .then(r => {
            if (r.length > 0) {
                res.sendStatus(200)
                    .setHeader('Content-type', 'application/json')
                    .json(r)
            } else {
                res.sendStatus(200)
                    .setHeader('Content-type', 'application/json')
                    .json([])
            }
        }).catch(e => {
            res.sendStatus(500)
                .setHeader('Content-type', 'application/json')
                .json({ error: 'ERR_INTERNALERROR' })
        })
}