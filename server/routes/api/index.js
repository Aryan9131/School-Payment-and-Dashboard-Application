const passport=require('passport')
const express= require('express');
const router = express.Router();

router.use('/transactions',require('./transactions'));
router.use('/user', require('./user'))

module.exports = router;
