import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import env from '../../env.json'

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    //const { token } = req.body

    try {

         const verified = verify(req.body.token, "HHJGHSVBCBF54B5841B251CV584B31FB5F1B2CV1N541NX2V1NF58G43")
         console.log(verified)
        // next()

    } catch (e) {
        console.log(e)
    }

}