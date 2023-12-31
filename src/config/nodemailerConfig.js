import nodemailer from "nodemailer"
import compliler from 'nodemailer-express-handlebars'
import __dirname from "../utils.js";

export const transporter = nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:'riquelmecata@gmail.com',
        pass:'lpch exyw jsby bfra'
    }
})

transporter.use('compile', compliler({
    viewEngine: {
        extname: '.handlebars',
        layoutsDir: __dirname+'/views/layouts',
        defaultLayout: false,
        partialsDir: __dirname+'/views'
    },
    viewPath: __dirname+'/views',
    extName: '.handlebars'
}))