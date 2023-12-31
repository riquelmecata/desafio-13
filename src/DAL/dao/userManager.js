import { UserModel as User } from "../db/models/user.model.js"

export default class UserManager {
    createUser = async (userPar) => {
        try {
            let user = await User.create(userPar)
            return {
                success: user ? user : false
            }
        } catch (error) {
            throw error
        }

    }
    findUserByEmail = async (email) => {
        try {
            let user = await User.findOne({ email: email.toString() });
           
            return {
                success: user ? user : false
            }
        } catch (error) {
            throw error
        }

    }
}