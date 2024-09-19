import express from 'express';
const router = express.Router();
import Category from '../controllers/category.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import Admin from '../middlewares/admin.js';
router.use('/category/delete', checkUserAuth, Admin.adminMiddleware)
router.use('/addcat', checkUserAuth, Admin.adminMiddleware)
router.use('/update', checkUserAuth, Admin.adminMiddleware)


router.post('/addcat', Category.addCategory)
router.get('/getcategory', Category.getCategories)
router.post('/category/delete/:id', Category.deleteCategories)
router.post('/update', Category.updateCategories)
// router.get('/getcategory', Category.createCategories)

export default router