import express from 'express';
const router = express.Router();
import Product from '../controllers/product.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import upload from '../middlewares/upload.js';
import Admin from '../middlewares/admin.js';

router.use('/createpro',checkUserAuth,Admin.adminMiddleware, upload.array('productPictures', 4))
router.use('/getpro',checkUserAuth,Admin.adminMiddleware, upload.array('productPictures', 4))

router.post('/createpro', Product.createProduct)
router.get('/getpro', Product.getProducts)
router.post('/pro/delete/:id', Product.deleteProductById)
router.post('/prodetail/:id', Product.getProductDetailsById)
export default router