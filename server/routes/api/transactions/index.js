const passport=require('passport')
const express= require('express');
const router = express.Router();
const TransactionController = require('../../../controllers/TransactionController')

// Fetch all transactions
router.get('/',TransactionController.getAllTransactions);
router.get('/school/:id',TransactionController.getAllSchoolTransactions);
router.get('/custom-order-id/:id',TransactionController.getTransactionStatusByCustomOrderID);

router.post('/update-status/:id',passport.authenticate('jwt', {session:false}),TransactionController.updateTransactionStatus);

module.exports = router;

