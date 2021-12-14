const Router = require('express');
const authController = require('../controllers/auth-controller');
const router = new Router();
const {body} = require('express-validator');

// autorization
router.post('/auth/registration',
    body('email').isEmail(),
    body('password').isLength({min:3, max:32}),
    authController.registration
);
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/activate/:link', authController.activate);
router.get('/auth/refresh', authController.refresh);
router.post('/auth/reset', authController.reset);
router.post('/auth/update/:token', authController.updatePassword);

module.exports = router;