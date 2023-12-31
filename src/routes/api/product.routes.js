

import { Router } from 'express';
import { getProducts, getOneProductById, createProduct, productDeleter, productUpdater, createPremiumProduct } from '../../controller/product.controller.js';
import { isAdmin, isPremium } from '../../middlewares/auth.middleware.js';

// Importar todos los routers;
export const router = Router();

router.get('/', getProducts);

// Endpoint para traer el producto solicitado by id en el params
router.get('/:pid', getOneProductById);

router.post("/", isAdmin, createProduct);

router.post('/premium', isPremium, createPremiumProduct)

router.put('/:pid', isAdmin, productUpdater);

router.delete('/:pid', productDeleter);