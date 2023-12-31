import { TicketModel } from "../db/models/tickets.model.js"
import { ProductsModel } from "../db/models/products.model.js"
import CartManagerDB from "../dao/cartManagerMongo.js"

const Cart = new CartManagerDB()

export default class TicketManager {

    createTicket = async (cid, email = "default") => {
        let cidFull = await Cart.getCartById(cid)
        if (!cidFull) throw new Error("Cart not Found")
        let noStock = []
        let total = 0
        for (let i = 0; i < cidFull.products.length; i++) {
            const element = cidFull.products[i];

            if (element.item.stock >= element.qty) {
                const toUpdate = await ProductsModel.findById(element.item._id.toString());
                toUpdate.stock -= element.qty
                total += (element.qty * element.item.price)
                await toUpdate.save()
            } else {
                noStock.push({
                    item: element.item._id.toString(),
                    qty: element.qty
                })
            }
        }

        const ticket = await TicketModel.create({
            amount: total,
            purchaser: email,
        })
        cidFull.products = noStock
        await cidFull.save()


        return {
            ticket,
            noStock: cidFull.products
        }
    }


}