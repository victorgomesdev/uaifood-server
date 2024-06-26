import { NextFunction, Request, Response } from "express";
import db from "../../db";

export default function editUserMiddleware(req: Request, res: Response, next: NextFunction) {

    const { name, email, password } = req.body

    db.editUser({ name, email, password })
        .then(update => {
            if (update.matchedCount > 0) {
                next()
            } else {
                res.status(404)
                    .setHeader("Content-Type", 'application/json')
                    .json({ error: 'ERR_USERNOTFOUND' })
            }
        }).catch(e => {
            res.sendStatus(500)
                .setHeader('Content-Type', 'application/json')
                .json({ error: 'ERR_INTERNATERROR' })
            console.log(e)
        })
}