import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import env from '../../env.json'

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    try {

         const verified = verify(req.body.token, env.SECRET_KEY, { algorithms: ['HS256']})
         console.log(verified)
        
         if(verified){
    
         }

    } catch (e) {
        console.log("[AUTH] ERRO DE AUTENTICAÇÃO", e)
        res.status(500)
        .setHeader("Content-Type", "application/json")
    }

}