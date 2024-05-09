import { Request, Response } from "express";
import db from "../../db";

export default async function createUserMiddleware(req: Request, res: Response) {

    db.addUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then((r) => {

        if (r.acknowledged) {

            console.log(`[ADD_USER] USUÁRIO ${req.body.name} ADICIONADO, ID: ${r.insertedId}`)
            res.status(200)
                .setHeader("Content-Type", "application/json")
                .json({id: r.insertedId})
        }
    }).catch((e)=>{
        res.status(422)
                .setHeader("Content-Type", "application/json")
                .json({msg: "Não foi possível adicionar este usário por" + e})
    })
}