import { tokenModel } from '../DAL/db/models/tokens.model.js'

class ViewsController {

    resetPassword = async (req, res) => {
        try {
            res.render('passwordReset')
        } catch (error) {
            res.send(error)
        }
    }

    createNewPassword = async (req,res) => {
        try {
            const {userId, token} = req.params
            const tokenDB = await tokenModel.findOne({
                userId: userId,
                token: token
            })

            if(!tokenDB){
                res.render('expiredLink')
            } else {
                res.render('createNewPassword', {
                    userId: userId,
                    token: token
                })
            }
        } catch (error) {
            res.send(error)
        }
    }
}

export default new ViewsController()
