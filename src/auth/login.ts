import { Request, Response } from "express";
import { sign } from 'jsonwebtoken'
import env from '../../env.json'
import Db from "../db";

export default async function loginMiddleware(req: Request, res: Response, db: Db) {

    db.getUserData(req.body.email)
        .then((r) => {

            if (r != null) {

                const payload = JSON.stringify({
                    id: r._id,
                    email: r.email,
                    name: r.name
                })

                const token = sign(payload, env.SECRET_KEY)

                res.status(200).setHeader("Content-Type", "application/json")
                    .json({
                        id: r._id,
                        name: r.name,
                        email: r.email,
                        token: token,
                        acess: 'ALLOWED'
                    })


            } else {
                res.status(404)
                    .setHeader("Content-Type", "application/json")
                    .json({ status: 'ERR_ACCESSDENIED_USERNOTFOUND' })
            }
        }).catch((e) => {

            res.status(500).setHeader("Content-Type", "application/json")
                .json({ status: 'ERR_ACCESSDENIED_INVALIDUSER' })

            console.log("[AUTH] ERRO DE LOGIN:", e)
        })
}