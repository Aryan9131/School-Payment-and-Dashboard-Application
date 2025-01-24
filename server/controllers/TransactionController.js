const Transaction = require('../models/CollectRequestStatus');
const TransactionDetails = require('../models/CollectRequest'); // Adjust the path
const mongoose= require('mongoose')

module.exports.getAllTransactions = async (req, res) => {
  try {
    console.log('transactions request come!');
    const transactions = await Transaction.find({}).populate('collect_id').exec();

    console.log('transations came : ' + transactions)
    res.status(200).json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Error fetching transactions', error: err });
  }
}

module.exports.getAllSchoolTransactions = async (req, res) => {
  try {
    console.log('getAllSchoolTransactions request come : ' + req.params.id);
    const transactions = await Transaction.find({}).populate('collect_id').exec();
    console.log('transactions in schoolwise : ' + transactions)
    const filteredTransactions = transactions.filter((item) => item.collect_id.school_id.toString() == req.params.id.toString())
    console.log('filteredTransactions : ' + filteredTransactions)
    res.status(200).json(filteredTransactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Error fetching transactions', error: err });
  }
}

module.exports.getTransactionStatusByCustomOrderID = async (req, res) => {
  try {
    console.log('getAllSchoolTransactions request come : ' + req.params.id);

    const transactions = await Transaction.find({}).populate('collect_id').exec();

    console.log('transactions in schoolwise : ' + transactions)
    const filteredTransactions = transactions.filter((item) => item.collect_id.custom_order_id.toString() == req.params.id.toString())
    console.log('filteredTransactions : ' + filteredTransactions)
    res.status(200).json(filteredTransactions[0]);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Error fetching transactions', error: err });
  }
}

module.exports.updateTransactionStatus = async (req, res) => {
  try {
    console.log(' body get : ' + JSON.stringify(req.body) + " status : " + req.body.status +" collectId: " +JSON.stringify(req.params.id));
    const transaction = await Transaction.findById(req.params.id);
    transaction.status = req.body.status;
    await transaction.save();
    console.log('transaction updated : ' + transaction);
    res.status(200).json({
      message: 'transation status updated !'
    });
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ message: 'Error while Updating transactions', error: err });
  }
}

module.exports.webhookController = async (req, res) => {
  try {
    const payload = req.body;

    // Validate the payload
    if (!payload.status || !payload.order_info || !payload.order_info.order_id) {
      return res.status(400).json({ message: 'Invalid payload structure' });
    }

    const { order_id, order_amount, transaction_amount, gateway, bank_reference } =
      payload.order_info;
    
    // Update the transaction in the database
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { collect_id: order_id }, // Match transaction by `collect_id`
      {
        status: payload.status,
        transaction_amount,
        gateway,
        bank_reference,
      },
      { new: true } // Return the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction status updated', updatedTransaction });
  } catch (error) {
    console.error('Error in webhook:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
}