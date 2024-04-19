import { NextFunction, Request, Response } from "express";
import Db from ".";

export default function editUserMiddleware(req: Request, res: Response, next: NextFunction, db: Db) {

    const { name, email, password } = req.body

    db.editUser({ name, email, password })
        .then(update => {
            if (update.matchedCount > 0) {
                next()
            } else {
                res.status(404)
                    .setHeader("Content-Type", 'application/json')
                    .json({ msg: 'Usuário não encontrado' })
            }
        })
}