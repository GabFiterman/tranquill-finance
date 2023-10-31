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
const { updateAccountBalance } = require('../controllers/accountController');

exports.createTransaction = async (req, res) => {
    try {
        const create = createDocument(transactionModel);
        await create(req, res);

        const send = {
            body: {
                _id: req.body.account,
                value: req.body.value,
                type: req.body.type,
            },
        };
        await updateAccountBalance(send, res, false);
    } catch (err) {
        // TODO: melhorar tratamento de erros
        throw new Error(err);
    }
};
exports.getAllTransactions = readAllDocuments(transactionModel);
exports.getAllTransactionsFromUser = readAllDocumentsFromUser(transactionModel);
exports.getOneTransaction = readOneDocument(transactionModel);
exports.updateTransaction = updateDocument(transactionModel);
exports.deleteTransaction = deleteDocument(transactionModel);
