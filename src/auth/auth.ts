import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction} from 'express'
import env from '../../env.json' 

export default async function authMiddleware(req: Request, res: Response, next: NextFunction){
    
    const token = req.body.token

    const verified = verify(token, env.SECRET_KEY)

    console.log(verified)
    next()
}