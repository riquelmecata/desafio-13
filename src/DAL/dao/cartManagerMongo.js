import fs from "fs"
import { ProductsModel } from "../db/models/products.model.js"
import { CartModel } from "../db/models/carts.model.js"


export default class CartManagerDB {

    createCart = async (arr) => {
        try {
            let lg = arr?.length
            let cart

            if (lg > 0) {
                cart = await CartModel.create({ products: [] })
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    let prod = await ProductsModel.findById(element)
                    console.log(prod)

                    if (prod) cart.products.push({ item: prod._id, qty: prod.qty })
                }
                await cart.save()
            } else {
                cart = await CartModel.create({ products: [] })
            }
            return cart
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    getCarts = async () => {
        try {
            const data = await CartModel.find().populate("products.item")
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    getCartById = async (id) => {
        try {
            let cart = await CartModel.findById(id).populate("products.item")
            return cart
        } catch (error) {
            console.log(error)
            return error
        }
    }

    cartCleaner = async (id) => {
        try {
            let cart = await CartModel.findById(id)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            console.log(error)
            return error
        }
    }

    updateCart = async (cid, pid) => {
        let cart = await this.getCartById(cid);
        let pro = await ProductsModel.findById(pid);
    
        if (!pro || !cart) {
            return "No keys match with cart id";
        }
    
        if (cart.products.some(el => el.item && el.item._id && el.item._id.toString() === pid)) {
            await this.updatePidQty(cid, pid);
        } else {
            if (!pro._id) {
                console.error("Product _id is undefined");
                return "Product _id is undefined";
            }
    
            if (!cart.products) {
                cart.products = [];
            }
    
            cart.products.push({
                item: pro._id
            });
    
            try {
                await cart.save();
                return cart;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    };

    updateCartByArr = async (cid, arr) => {
        try {

            let cart = await CartModel.findById(cid)
            if (!cart) throw new Error("No se encontro carro con ese Id")
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                let prod = await ProductsModel.findById(element)
                if (prod) cart.products.push({ item: prod._id, qty: prod.qty })
            }
            await cart.save()

            return cart

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    deleteProductCart = async (cid, pid) => {
        try {

            let cart = await CartModel.findById(cid)
            if (!cart) throw new Error("No se encontro carro con ese Id")

            let pep = await CartModel.updateOne({ _id: cid }, { $pull: { products: { item: pid } } })
            console.log(pep)
            if (pep.modifiedCount) return "Producto eliminado"
            else return "No existe ese producto en el carrito"

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    updatePidQty = async (cid, pid) => {

        try {
            const cart = await CartModel.findById(cid);
            const productIndex = cart.products.findIndex(
                (product) => product.item.toString() === pid
            );

            if (productIndex !== -1) {
                cart.products[productIndex].qty += 1;
                await cart.save();
                return cart;
            } else {
                throw new Error(`Producto con el ID ${pid} no encontrado en el carrito`);
            }
        } catch (error) {
            console.error(error);
        }





    }

}