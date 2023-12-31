import ProductManagerDB from '../DAL/dao/productManagerMongo.js';

export const dbM = new ProductManagerDB()

// Importar todos los routers;

export const getProducts = async (req, res) => {

    try {
        const { limit, page, sort } = req.query
        let filterQuery = { ...req.query }
        if (limit) delete filterQuery.limit
        if (page) delete filterQuery.page
        if (sort) delete filterQuery.sort

        let arrProduct = await dbM.getProducts(limit, page, sort, filterQuery)
        return res.status(200).json({
            status: "success",
            ...arrProduct
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: "error", error: e.message })
    }
}

// Endpoint para traer el producto solicitado by id en el params
export const getOneProductById = async (req, res) => {
    const { pid } = req.params
    if (!pid) return res.status(400).json({ status: "error", error: "Debe enviar un id de producto por params" })
    try {
        let payload = await dbM.getProductById(pid)
        return res.status(200).json({ status: "success", payload, })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: "error", error: e.message })
    }
}


export const createProduct = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;
    const product = { title, description, code, price, status, stock, category, thumbnail }
    try {
        // Verificar si los campos obligatorios están presentes
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Todos los campos obligatorios deben estar presentes para crear el producto');
        }

        // Crear el objeto del producto
        const obj = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail,
        };

        // Agregar el producto a la base de datos
        const arrProduct = await dbM.addProduct(obj);

        return res.status(200).json({ result: arrProduct });
    } catch (error) {
        // Manejo de errores
        console.error(error);

        // Enviar una respuesta de error al cliente
        return res.status(500).json({ error: error.message || 'Error al crear el producto' });
    }
};

export const createPremiumProduct = async (req, res, next) => {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body;

    try {
        // Verificar si los campos obligatorios están presentes
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Todos los campos obligatorios deben estar presentes para crear el producto');
        }

        // Obtener el correo electrónico del usuario que crea el producto (suponiendo que está disponible en req.user.email)
        const ownerEmail = req.user.email || req.user.emailAddress; // Utiliza el correo electrónico del usuario autenticado

        // Crear el objeto del producto con el correo electrónico del propietario
        const obj = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail,
            owner: ownerEmail, // Asigna el correo electrónico del propietario al producto
        };

        // Agregar el producto a la base de datos
        const arrProduct = await dbM.addProduct(obj);

        return res.status(200).json({ result: arrProduct });
    } catch (error) {
        // Manejo de errores
        console.error(error);

        // Enviar una respuesta de error al cliente
        return res.status(500).json({ error: error.message || 'Error al crear el producto' });
    }
};
export const productUpdater = async (req, res) => {
    const { pid } = req.params
    let objeChanges = { ...req.body }
    delete objeChanges.id;
    const keysArr = Object.keys(objeChanges)

    if (pid && keysArr.length > 0) {
        try {

            if (objeChanges.title) objeChanges.title = objeChanges.title.toString()
            if (objeChanges.description) objeChanges.description = objeChanges.description.toString()
            if (objeChanges.code) objeChanges.code = objeChanges.code.toString()
            if (objeChanges.price) objeChanges.price = parseFloat(objeChanges.price)
            if (objeChanges.status) objeChanges.status = Boolean(objeChanges.status)
            if (objeChanges.stock) objeChanges.stock = parseInt(objeChanges.stock)
            if (objeChanges.category) objeChanges.category = objeChanges.category.toString()
            if (objeChanges.category) objeChanges.category = objeChanges.category.toString()
            if (objeChanges.thumbnail) objeChanges.thumbnail = objeChanges.thumbnail.toString();

                    
                
            


            let arrProduct = await dbM.updateProduct(pid, objeChanges)
            return res.status(200).json({ result: arrProduct })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e.message })
        }
    } else return res.status(400).json({ error: "Debe enviar un id de producto por params y los campos a modificar por body" })

}

    export const productDeleter = async (req, res) => {
    const { pid } = req.params

    if (!pid) return res.status(400).json({ error: "Debe enviar un id de producto por params" })
    try {
        await dbM.deleteProduct(pid)
        return res.status(200).json({ result: "Producto borrado" })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e.message })
    }


} 





export const productIdFinderDBM = dbM.getProductById