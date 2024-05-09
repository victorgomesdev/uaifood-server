import { Router } from "express";
import editUserMiddleware from "./edit_user";
import db from "../../db";

const userController = Router()

userController.post('/user/edit', editUserMiddleware, async (req, res)=>{

    db.getUserData(req.body.email)
    .then(result=>{
        res.sendStatus(200)
        .setHeader("Content-Type", "application/json")
        .json(result)
    })
})

export default userController