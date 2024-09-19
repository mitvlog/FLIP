import express from 'express';
const router = express.Router();
import Carts from '../controllers/cart.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

router.use('/cart', checkUserAuth)
router.use('/getcart', checkUserAuth)

router.post('/cart', Carts.addItemToCart)
router.post('/cartremove/:id',checkUserAuth, Carts.removeCartItems)
router.get('/getcart', Carts.getCartItems)

export default router