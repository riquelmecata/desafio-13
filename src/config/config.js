import dotenv from "dotenv";
dotenv.config();

const env = {
    userDb: process.env.userDb,
    passwordDb: process.env.passwordDb,
    node_env: process.env.NODE_ENV,
}

export default env
