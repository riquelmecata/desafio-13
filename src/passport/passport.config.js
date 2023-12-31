import passport from "passport";
import bcrypt from "bcrypt"
import { Strategy as GitHubStrategy } from "passport-github2";

import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../DAL/db/models/user.model.js";
import { dbM}  from "../controller/sessions.controller.js";
let encryptRounds = 1

import { emailSender } from "../mailer/mailer.js"
import { confirmEmailTemplate } from "../mailer/templates/confirmRegister.js"


passport.use("login", new LocalStrategy({
    usernameField: "email",
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        let finded = await dbM.findUserByEmail(email?.toString().toLowerCase())

        if (!finded.success) done(null, false)
        let user = JSON.parse(JSON.stringify(finded.success))
        if (bcrypt.compareSync(password, user.password)) {

            done(null, user);
        } else {
            done(null, false);
        }
    } catch (e) {
        done(e, false);
    }
}));

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        const {
            first_name,
            last_name,
            age,
            role
        } = req.body
        if (first_name !== undefined && last_name !== undefined && email !== undefined && age !== undefined && password !== undefined && role !== undefined) {

            try {
                let obj = {}
                obj.first_name = first_name.toString()
                obj.last_name = last_name.toString()
                obj.email = email.toString().toLowerCase()
                obj.age = parseFloat(age);
                obj.role = role.toString().toLowerCase();
                obj.password = bcrypt.hashSync(password, encryptRounds);
                let newUser = await dbM.createUser(obj)
                if (!newUser.success) done({ error: "No se pudo crear el usuario" }, false)
                await emailSender(newUser.success.email, "Prueba", confirmEmailTemplate(newUser.success.first_name))
                return done(null, newUser.success)
            } catch (e) {
                done({ error: e.message }, false)
            }
        } else done({ error: "Faltan campos obligatorios" }, false)

    }
))

passport.use("github", new GitHubStrategy({
    clientID: "Iv1.d895f19de6b15fef",
    clientSecret: "1c2ba7671f5b830faaf138660090ff0b474d07fc",
    callbackURL: "http://localhost:8080/api/sessions/githubcallback",
    scope: ['user:{ email: profile._json.email }']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)

            let finded = await dbM.findUserByEmail({ email: profile._json.email })
            if (finded.success) done(null, finded.success)


            let user = await UserModel.create({
                first_name: profile._json.login,
                last_name: "github",
                email: profile._json.email,
                password: ' ',
                age: 0,
                role: "usuario"
            })

            if (user) done(null, user)
            else {
                done(null, false)
            }

        } catch (e) {
            done(e, false)
        }
    }))
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {

    const user = await UserModel.findById(id);
    done(null, user)
    // done(err, user)
});
