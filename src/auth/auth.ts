import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import env from '../../env.json'
import Db from '../db'
import { UserProps } from '../types'

export default async function authMiddleware(req: Request, res: Response, next: NextFunction, db: Db) {

    try {

        const verified = verify(req.body.token, env.SECRET_KEY, { algorithms: ['HS256'] }) as UserProps
        console.log(verified)

        if (verified) {
            db.getUserData(verified.email)
                .then(r => r != null ? next() : res.status(401)
                    .setHeader("Content-Type", 'application/json')
                    .json({ msg: 'Token inválido', access: 'DENIED' }))
        }

    } catch (e) {
        console.log("[AUTH] ERRO DE AUTENTICAÇÃO", e)
        res.status(500)
            .setHeader("Content-Type", "application/json")
            .json({ msg: 'Erro interno do servidor' })
    }

}