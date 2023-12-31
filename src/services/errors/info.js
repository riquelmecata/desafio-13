export const generateProductErrorInfo = (product) => {
    return `Una o más propiedades estan incompletas o no son validas.
    Lista de propiedades requeridas:
    *description : needs to be a String, received ${product.description}
    *thumbnail   : needs to be a String, received ${product.thumbnail}
    *price       : needs to be a String, received ${product.price}
    *stock       : needs to be a String, received ${product.stock}
    *category    : needs to be a String, received ${product.category}
    *availability: needs to be a String, received ${product.availability}`
}

export const deleteProductErrorInfo = (product) => {
    return `Error al eliminar el Producto.
    *El producto que no se pudo eliminar tiene el id ${id}`
}
export const updateProductErrorInfo = (id, product) => {
    return `Error al actualizar el producto.
    El producto que no se pudo actualizar tiene el id ${id}
    La información ingresada fue la siguiente:
    *description : needs to be a String, received ${product.description}
    *thumbnail      : needs to be a String, received ${product.thumbnail}
    *price       : needs to be a String, received ${product.price}
    *stock       : needs to be a String, received ${product.stock}
    *category    : needs to be a String, received ${product.category}
    *availability: needs to be a String, received ${product.availability}`
}