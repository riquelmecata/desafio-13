import { ProductsModel } from "../db/models/products.model.js"

export default class ProductManager {

    getProducts = async (limit, page, sort, filterQuery) => {
        try {
            let options = { limit: 10, page: 1 }
            if (limit) options.limit = limit
            if (page) options.page = page
            if (sort) options.sort = { price: sort }
            const data = await ProductsModel.paginate(filterQuery, options)

            let obj = {
                payload: data.docs,
                totalPages: data.totalPages,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                page: data.page,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevLink: data.prevPage ? `localhost:8080/api/products?limit=${options.limit}&page=${data.prevPage}` : null,
                nextLink: data.nextPage ? `localhost:8080/api/products?limit=${options.limit}&page=${data.nextPage}` : null,
            }
            return obj
        } catch (error) {
            throw error
        }
    }

    getProductById = async (id) => {

        try {
            let products = await ProductsModel.findById(id)
            if (products) return products
            else {
                return { Error: "No encontrado" }
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    addProduct = async (productEn) => {
        const { title, description, code, price, status, stock, category, thumbnail } = productEn

        if (title !== undefined && description !== undefined && code !== undefined && price !== undefined && stock !== undefined && category !== undefined) {

            try {
                await ProductsModel.create(productEn)
                return "Producto agregado"
            } catch (e) {
                throw new Error(e.message)
            }
        } else throw new Error("Debe proporcionar todos los campos: title, description, code, price, stock, category, thumbnail (opcional).")


    }

    updateProduct = async (id, keysObject) => {
        try {
            const msg = await ProductsModel.findOneAndUpdate({ _id: id }, keysObject)
            if (msg) {
                let updated = await ProductsModel.findById(id)
                return updated
            } else throw new Error("No encontrado")
        } catch (error) {
            throw error
        }
    }

    deleteProduct = async (id) => {
        try {
            let deleted = await ProductsModel.findByIdAndDelete(id)
            if (!deleted) throw new Error("No encontrado")
        } catch (error) {
            throw error
        }

    }
}