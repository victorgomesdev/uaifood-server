import Db from "../db/mongo";

export default async function findUser(db: Db, email: string) {
    const user = await db.getUserData(email)

    return user != null? user: null
}