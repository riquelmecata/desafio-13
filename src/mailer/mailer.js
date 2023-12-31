import nodemailer from "nodemailer"
import env from "../config/config.js";
import { transporter } from "../config/nodemailerConfig.js";

// export const transporter= nodemailer.createTransport({
//     service:'gmail',
//     port:587,
//     auth:{
//         user:'riquelmecata@gmail.com',
//         pass:'lpch exyw jsby bfra'
//     }
// })


export const emailSender = async (mailTo, subjectStr, htmlFunc) => {

    try {
        await transporter.sendMail({
            from: `"Prueba" <riquelmecata@gmail.com>`, // sender address
            to: mailTo, // list of receivers
            subject: subjectStr, // Subject line
            html: htmlFunc, // html body
        });

        return { success: true }

    } catch (error) {
        console.log(error)
        return { err: "Can not send the email" }
    }



}