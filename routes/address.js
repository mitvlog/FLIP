import express from 'express';
const router = express.Router();
import Add from '../controllers/address.js';
import checkUserAuth from '../middlewares/auth-middleware.js';

router.use('/getadd', checkUserAuth)
router.use('/addAddress', checkUserAuth)

router.post('/addAddress', Add.addAddress)
router.get('/getadd', Add.getAddress)

export default router