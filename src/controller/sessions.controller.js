
import UserManager from '../DAL/dao/userManager.js';
import SessionDTO from '../dto/UsersDTO/session.dto.js';

export const dbM = new UserManager()

export const loginController= async (req, res) => {
    console.log("entro")
    res.status(200).json({ result: true })
}

export const logoutController = async (req, res) => {
    try {
        req.session.destroy(() => {
            req.logout((err) => console.log(err));
            res.status(200).json({ success: true  });
        }); 
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error.message });
    }
};

export const signUpController= async (req, res) => {

    if (req.user) res.status(200).json({ result: req.user })

}

export const getCurrentSessionUser = async (req,res) => {
    try {
        const currentSession = req.session
        const currentUser = currentSession.user
        res.send(currentUser)
    } catch (error) {
        res.send(error)
    }
}