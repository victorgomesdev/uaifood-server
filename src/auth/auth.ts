import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction} from 'express'
import env from '../../env.json' with {type: 'json'}
import Db from '../db/mongo'

export default async function authMiddleware(req: Request, res: Response, next: NextFunction){
    
    const token = req.body.token

    const verified = verify(token, env.SECRET_KEY)

    if(verified){
        //TODO impleementar a lógica aqui
    }
    next()
}