import express from 'express';
const router = express.Router();
import AdminController from '../controllers/auth.js';

import checkUserAuth from '../middlewares/auth-middleware.js';

// ROute Level Middleware - To Protect Route
// router.use('/changepassword', checkUserAuth)
// router.use('/loggeduser', checkUserAuth)

// Public Routes
router.post('/admin/register', AdminController.signup)
router.post('/admin/login', AdminController.signin)
router.post('/admin/signout', AdminController.signout)
// router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
// router.post('/reset-password/:id/:token', UserController.userPasswordReset)
// router.get('/alluser', UserController.allUser)

// Protected Routes
// router.post('/changepassword', UserController.changeUserPassword)
// router.get('/loggeduser', UserController.loggedUser)


export default router