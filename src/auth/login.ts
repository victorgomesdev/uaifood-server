import { Request, Response } from "express";
import {sign} from 'jsonwebtoken'
import Db from "../db/mongo";

export default async function loginMiddleware(req: Request, res: Response, db: Db){

    const user = await db.getUserData(req.body.email)

    if(user != null){

        //O token tem que ter o email a validade e o nome
    }
}