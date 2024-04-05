import { Request, Response } from "express";
import { sign } from 'jsonwebtoken'
import env from '../../env.json' with {type: 'json'}
import Db from "../db/mongo";

export default async function loginMiddleware(req: Request, res: Response, db: Db) {

    db.getUserData(req.body.email)
        .then((r) => {

            if (r != null) {

                const token = sign({
                    eml: r.email,
                    nam: r.name
                },
                    env.SECRET_KEY,
                    {
                        expiresIn: 30,
                        algorithm: 'HS256'
                    })


                res.status(200)
                    .send({
                        id: r._id,
                        name: r.name,
                        email: r.email,
                        token: token
                    }).setHeader("Content-Type", "application/json")
            }
        })
}