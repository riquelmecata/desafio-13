import CustomError from '../services/errors/CustomError.js'
import { ErrorsCause, ErrorsMessage, ErrorsName } from '../services/errors/enum.js'

export const isAdmin = (req, res, next) => {
    if (req?.user?.role === "admin") {
        // Si el usuario tiene el rol de "admin"
        next();
    } else {
        CustomError.createCustomError({
            name: ErrorsName.INVALID_ROLE_ADMIN,
            cause: ErrorsCause.INVALID_ROLE_ADMIN,
            message: ErrorsMessage.INVALID_ROLE_ADMIN,
        });
    }
};

export const isLogged = (req, res, next) => {
    if (req.user || req?.session?.user?.role) {
        // Si hay un usuario autenticado o si existe algún rol en la sesión
        next();
    } else {
        CustomError.createCustomError({
            name: ErrorsName.INVALID_SESSION,
            cause: ErrorsCause.INVALID_SESSION,
            message: ErrorsMessage.INVALID_SESSION,
        });
    }
};


export const isPremium = (req, res, next) => {
    if (req?.user?.role === "premium" || req?.user?.role === "admin") {
        next();
    } else {
        CustomError.createCustomError({
            name: ErrorsName.INVALID_ROLE,
            cause: ErrorsCause.INVALID_ROLE,
            message: ErrorsMessage.INVALID_ROLE,
        });
    }
};