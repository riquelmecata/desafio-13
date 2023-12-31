import CartManagerDB from '../DAL/dao/cartManagerMongo.js';
export const dbM = new CartManagerDB()


export const createCart = async (req, res) => {
    const { products } = req.body
    try {
        let cart = await dbM.createCart(products)
        return res.status(200).json({ result: cart })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e.message })
    }
}

export const getCart = async (req, res) => {
    const { cid } = req.params
    if (!cid) return res.status(400).json({ error: "Cid is empty" })

    try {
        let arrProduct = await dbM.getCartById(cid)
        return res.status(200).json({ status: "success", payload: arrProduct })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e.message })
    }

}

export const cartUpdater = async (req, res) => {
    const { cid } = req.params
    const { products } = req.body

    if (!cid || !products) return res.status(400).json({ status: "error", error: "Cid and Array must be provided" })
    try {
        let result = await dbM.updateCartByArr(cid, products)
        return res.status(200).json({ status: "success", payload: result })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: "error", error: e.message })
    }

}

export const cartCleaner = async (req, res) => {
    const { cid } = req.params
    if (!cid) return res.status(400).json({ error: "Cid is empty" })

    try {
        let arrProduct = await dbM.cartCleaner(cid)
        return res.status(200).json({ status: "success", payload: arrProduct })
    } catch (e) {
        console.log(e)

        return res.status(500).json({ error: e.message })
    }

}

export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params

    if (!cid || !pid) return res.status(400).json({ error: "Cid and Pid must be provided" })

    try {

        let result = await dbM.updateCart(cid, pid)
        return res.status(200).json({ result: result })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e.message })
    }


}

export const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params

    if (!cid || !pid) return res.status(400).json({ error: "Cid and Pid must be provided" })
    try {
        let result = await dbM.deleteProductCart(cid, pid)
        return res.status(200).json({ result: result })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e.message })
    }
}

export const incrementProduct = async (req, res) => {
    const { cid, pid } = req.params

    if (!cid || !pid) return res.status(400).json({ error: "Cid and Pid must be provided" })
    try {
        let result = await dbM.updatePidQty(cid, pid)
        return res.status(200).json({ status: "success", payload: result })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e.message })
    }
}