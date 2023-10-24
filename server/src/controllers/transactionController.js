/* eslint-disable no-undef */
const { transactionModel } = require('../models');
const {
    createDocument,
    readAllDocuments,
    readAllDocumentsFromUser,
    readOneDocument,
    updateDocument,
    deleteDocument,
} = require('../common/crud');

exports.createTransaction = createDocument(transactionModel);
exports.getAllTransactions = readAllDocuments(transactionModel);
exports.getAllTransactionsFromUser = readAllDocumentsFromUser(transactionModel);
exports.getOneTransaction = readOneDocument(transactionModel);
exports.updateTransaction = updateDocument(transactionModel);
exports.deleteTransaction = deleteDocument(transactionModel);
