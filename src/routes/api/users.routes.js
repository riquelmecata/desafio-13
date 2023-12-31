import { Router } from "express";
import UsersController from "../../controller/user.controller.js";

export const router = Router();

// router.post('/register', passport.authenticate('register', {
//     failureRedirect: '/registerError',
//     successRedirect: '/',
//     passReqToCallback: true,
// }))

// router.post('/login', passport.authenticate('login'), async (req,res) => {
//     req.session.user = req.user
//     res.redirect('/products')
// })


// router.get('/github/auth', passport.authenticate('githubAuth', {scope: [ 'user:email' ] }))
// router.get('/github/callback', passport.authenticate('githubAuth'), async (req,res) => {
//     req.session.user = req.user
//     res.redirect('/products')
// })

// router.get('/logout', usersController.logut)

router.post('/resetpassword', UsersController.resetPassword)

router.post('/premium/:userId', UsersController.setPremium)

router.delete('/premium/:userId/products/:prodId', UsersController.deleteOwnProduct)

router.post('/createNewPassword/:userId/:token', UsersController.createNewPassword)