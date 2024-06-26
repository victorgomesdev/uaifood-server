import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import env from '../../env.json'
import db from '../db'
import { UserProps } from '../types'

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const verified = verify(req.body.token, env.SECRET_KEY, { algorithms: ['HS256'] }) as UserProps

        if (verified) {
            const user = await db.getUserData(verified.email)
            if (user !== null) {
                next()
            } else {
                res.status(401).json({ error: 'ERR_ACCESSDENIED_INVALIDTOKEN' })
            }
        } else {
            res.status(401).json({ error: 'ERR_ACCESSDENIED_INVALIDTOKEN' })
        }
    } catch (e) {
        console.log("[AUTH] ERRO DE AUTENTICAÇÃO", e)
        res.status(500).json({ error: 'ERR_ACCESSDENIED_INTERNALERROR' })
    }
}
