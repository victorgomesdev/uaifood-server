import { Response, Request } from 'express'
import db from '../../db';

export default async function createDeviceMiddleware(req: Request, res: Response) {
    db.addDevice({
        name: req.body.name,
        description: req.body.description,
        owner_id: req.body.owner_id,
    }).then((r) => {

        if (r.acknowledged) {
            res.sendStatus(201)
                .setHeader("Content-Type", 'application/json')
                .json({ status: "CREATED", id: r.insertedId })
        } else {
            res.sendStatus(400)
                .setHeader('Content-Type', 'application/json')
                .json({ error: 'ERR_INVALID_DEVICE_CREDENTIALS' })
        }
    }).catch(e => {
        res.sendStatus(500)
            .setHeader("Content-Type", 'application/json')
            .json({ ERROR: "ERR_INTERNALERROR" })
    })
}