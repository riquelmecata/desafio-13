import { Router } from 'express';
import { createCart, getCart, cartUpdater, cartCleaner, addProductToCart, deleteProductFromCart, incrementProduct } from '../../controller/cart.controller.js';
import { postTicket } from '../../controller/ticket.controller.js';
import { isLogged }from "../../middlewares/auth.middleware.js"

export const router = Router();

router.post("/", createCart)

router.get("/:cid", getCart)

router.put("/:cid", cartUpdater)

router.delete("/:cid", /* isLogged, */ cartCleaner)

router.post("/:cid/product/:pid", /* isLogged, */ addProductToCart)

router.delete("/:cid/product/:pid", /* isLogged, */ deleteProductFromCart)

router.put("/:cid/product/:pid", /* isLogged, */ incrementProduct)

router.post("/:cid/purchase", postTicket)