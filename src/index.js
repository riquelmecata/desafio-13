import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import session  from "express-session";
import  FileStore  from "session-file-store";
import passport from "passport";
import "./passport/passport.config.js";
import swaggerUi from 'swagger-ui-express'

import { router as ProductRouter } from "./routes/api/product.routes.js"
import { router as CartRouter} from "./routes/api/carts.routes.js"
import { router as viewsRouter } from "./routes/view.routes.js"
import { router as sessionRouter } from "./routes/api/sessions.routes.js"
import { router as usersRouter } from "./routes/api/users.routes.js"

import swaggerSetup from "./docs/swagger.js";
import "./DAL/db/dbConfig.js"
import {Server} from "socket.io"
import dotenv from "dotenv";
dotenv.config();
import MessageManager from "./DAL/dao/messagesManager.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

const fileStore= FileStore(session)
app.use(session({
    store: new fileStore({
        path: __dirname+"/sessions"
    }),
    secret:"default",
    
}))


app.use(passport.initialize())
app.use(passport.session())

//Api Routes
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))
app.use('/users', usersRouter);
app.use('/', viewsRouter);

// Views routes
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.get('/', (req, res) => {
    res.redirect('/login')
})

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log("Andando en puerto " + PORT)
})

const msgInstance = new MessageManager()
const socketServer = new Server(httpServer)
let p = 0

const sessionMiddleware = session({
    store: new fileStore({
        path: __dirname + "/sessions"
    }),
    secret: "default",
});

socketServer.use((socket, next) => {
    sessionMiddleware(socket.request, {}, () => {
        passport.initialize()(socket.request, {}, () => {
            passport.session()(socket.request, {}, () => {
                try {
                    const user = socket.request.user; // Obtén el usuario de la sesión

                    if (user && user.role === "user") {
                        // Si el usuario tiene el rol de "admin", permite la conexión
                        return next();
                    } else {
                        // Si el usuario no tiene el rol adecuado, devuelve un error
                        throw new Error("Unauthorized");
                    }
                } catch (error) {
                    return next(error);
                }
            });
        });
    });
});


socketServer.on('connection', async (socket) => {
    p += 1
    console.log(`${p} connected`)
    console.log(socket.request.user.email)

    const msgs = await msgInstance.getMsgs()

    socket.emit('messages', msgs)

    socket.on('newMsg', async obj => {
        console.log("Entro a agregar");
        try {

            await msgInstance.newMsg({ ...obj, user: socket.request.user.email })
            const updateMsg = await msgInstance.getMsgs()
            socketServer.emit('messages', updateMsg)
        } catch (error) {
            return
        }
    })

    socket.on('disconnect', (msg) => {
        p -= 1
        console.log(`${p} connected`)
        console.log(msg);
    })

})



httpServer