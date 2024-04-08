import { Request, Response } from "express";
import { sign } from 'jsonwebtoken'
import env from '../../env.json'
import Db from "../db";

export default async function loginMiddleware(req: Request, res: Response, db: Db) {

    db.getUserData(req.body.id)
        .then((r) => {

            if (r != null) {

                const token = sign({
                    eml: r.email,
                    nam: r.name
                },
                    env.SECRET_KEY,
                )

                res.status(200).setHeader("Content-Type", "application/json")
                    .json({
                        id: r._id,
                        name: r.name,
                        email: r.email,
                        token: token
                    })


            }
        }).catch(() => {

            res.status(404).setHeader("Content-Type", "application/json")
                .json({ msg: "Não foi possível entrar, por favor tente mais tarde." })
        })
}