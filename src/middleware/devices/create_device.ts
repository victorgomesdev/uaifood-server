import {Response, Request} from 'express'
import db from '../../db';

export default async function createDeviceMiddleware(req: Request, res: Response) {
    db.addDevice({
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        owner_id: req.body.owner_id,
        imageUrl: req.body.imageUrl
    }).then((r)=>{

        if(r.acknowledged){
            res.sendStatus(201)
            .setHeader("Content-Type", 'application/json')
            .json({status:"CREATED", id: r.insertedId})
        }
    }).catch(e=>{
        res.sendStatus(400)
        .setHeader("Content-Type", 'application/json')
        .json({status: "ERR_NOTSUCCESS"})
    })
}