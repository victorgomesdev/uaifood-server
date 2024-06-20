import { Request, Response } from "express";
import db from "../../db";

export default async function createUserMiddleware(req: Request, res: Response) {

    db.addUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then((r) => {

        if (r.acknowledged) {

            console.log(`[ADD_USER] USUÁRIO ${req.body.name} ADICIONADO, ID: ${r.insertedId}`)
            res.status(201)
                .setHeader("Content-Type", "application/json")
                .json({ id: r.insertedId })
        } else {
            res.sendStatus(400)
                .setHeader('Content-Type', 'application/json')
                .json({ error: 'ERR_INVALIDCREDENTIALS' })
        }
    }).catch((e) => {
        res.status(500)
            .setHeader("Content-Type", "application/json")
            .json({ error: 'ERR_INTERNALERROR' })
    })
}