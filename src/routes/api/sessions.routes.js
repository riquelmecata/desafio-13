import { Router } from 'express';
import passport from 'passport';
import { loginController, logoutController, signUpController, getCurrentSessionUser} from "../../controller/sessions.controller.js"


// Importar todos los routers;
export const router = Router();


router.post("/login", passport.authenticate("login"), loginController)

router.delete('/logout', logoutController)

router.post("/register", passport.authenticate("signup"), signUpController)

router.get('/signup/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github', passport.authenticate('github'), async (req, res) => {
    if (req.user) res.redirect("../../products")
})

router.get('/current', getCurrentSessionUser)