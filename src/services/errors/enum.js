export const ErrorsName = {
    INVALID_PRODUCT_DATA: 'Error al agregar producto/s',
    INVALID_PRODUCT_ID: 'Error en el ID del producto',
    INVALID_CART_ID: 'Error en el ID del carrito',
    INVALID_ID: 'Error de ID',
    INVALID_DATA: 'Error de datos',
    INVALID_ADMIN_PASSWORD: 'Error de permisos',
    INVALID_SESSION: 'Error de sesión',
    INVALID_ROLE: 'Error de rol',
    INVALID_ROLE_ADMIN: 'Error de rol',
    INVALID_QUANTIY: 'Error de cantidad',
    FETCH_ERROR: 'Error al recuperar datos',
    SERVER_ERROR: 'Error de servidor',
    OWN_PRODUCT: 'Error de producto',
};


export const ErrorsCause = {
    INVALID_PRODUCT_DATA: 'Datos de producto inválidos o incompletos',
    INVALID_PRODUCT_ID: 'ID de producto inválido o inexistente',
    INVALID_CART_ID: 'ID de carrito inválido o inexistente',
    INVALID_ID: 'ID inválido',
    INVALID_DATA: 'Datos inválidos',
    INVALID_ADMIN_PASSWORD: 'Contraseña inválida o incorrecta',
    INVALID_SESSION: 'Sesión de usuario inválida o usuario no ha iniciado sesión',
    INVALID_ROLE: 'Rol no permitido',
    INVALID_ROLE_ADMIN: 'Rol no permitido',
    INVALID_QUANTIY: 'Cantidad inválida',
    FETCH_ERROR: 'Fallo al recuperar datos',
    SERVER_ERROR: 'Fallo al comunicarse con el servidor',
    OWN_PRODUCT: 'Error al agregar producto al carrito',
}


export const ErrorsMessage = {
    INVALID_PRODUCT_DATA: 'La solicitud falló. Se requieren datos de producto válidos y completos. El producto debe tener los siguientes campos: título: String || descripción: String || precio: Number || stock: Number || categoría: String || miniatura: String || estado: Boolean',
    INVALID_PRODUCT_ID: 'La solicitud falló. Se requiere un ID de producto válido o existente.',
    INVALID_CART_ID: 'La solicitud falló. Se requiere un ID de carrito válido o existente.',
    INVALID_ID: 'Uno o más ID son inválidos o no existen.',
    INVALID_DATA: 'Cualquier campo en los datos es inválido o falta.',
    INVALID_ADMIN_PASSWORD: 'No autorizado. Se requiere una contraseña de administrador válida y correcta.',
    INVALID_SESSION: 'No autorizado. Se requiere una sesión de usuario válida.',
    INVALID_ROLE: 'No autorizado. Debes ser premium para hacer esto.',
    INVALID_ROLE_ADMIN: 'No autorizado. Debes ser admin para hacer esto.',
    INVALID_QUANTIY: 'La cantidad debe ser un número entero positivo y válido.',
    FETCH_ERROR: 'Ocurrió un error al recuperar datos.',
    SERVER_ERROR: 'Ocurrió un error al comunicarse con el servidor.',
    OWN_PRODUCT: 'No puedes agregar tus propios productos a tu carrito.',
};