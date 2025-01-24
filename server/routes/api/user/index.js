const passport=require('passport')
const express= require('express');
const router = express.Router();
const UserController = require('../../../controllers/UserController')

router.post('/register-user', UserController.registerUser)
router.post('/create-session', UserController.createSession)
router.get('/get-user',passport.authenticate('jwt', {session:false}),UserController.getUser)
module.exports = router;
