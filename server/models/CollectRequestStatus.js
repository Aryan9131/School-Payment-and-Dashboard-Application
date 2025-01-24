const mongoose = require('mongoose');
const TransactionDetails = require('./CollectRequest'); // Adjust the path

const transactionsSchema = new mongoose.Schema(
    {
        collect_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'TransactionDetails',
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        payment_method: {
            type: String,
            required: true,
        },
        gateway: {
            type: String,
            required: true,
        },
        transaction_amount: {
            type: Number,
            required: true,
        },
        bank_refrence: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,  
        collection: 'collect_request_status',  
    }
);

const Transaction = mongoose.model('Transaction', transactionsSchema);

module.exports = Transaction;