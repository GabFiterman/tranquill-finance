/* eslint-disable no-undef */
const { accountModel, transactionModel } = require('../models');
const {
    createDocument,
    readAllDocuments,
    readAllDocumentsFromUser,
    readOneDocument,
    updateDocument,
    deleteDocument,
} = require('../common/crud');
const { errorRes, notFoundRes, successRes, createdRes } = require('../common/response');

exports.createAccount = createDocument(accountModel);

exports.getAllAccounts = readAllDocuments(accountModel);

exports.getAllAccountsFromUser = readAllDocumentsFromUser(accountModel);

exports.getOneAccount = readOneDocument(accountModel);

exports.updateAccount = updateDocument(accountModel);

exports.updateAccountBalance = async (req, res, returnRes = true) => {
    try {
        const { _id, value, type } = req.body;
        const account = await accountModel.findById(_id);

        if (type === 'receita') {
            account.balance += value;
        } else if (type === 'despesa') {
            account.balance -= value;
        } else {
            return errorRes(
                res,
                "Type must be equal to 'despesa' or 'receita'.",
                'Incorrect parameters',
            );
        }

        const updatedAccount = await account.save();

        if (returnRes) {
            successRes(res, updatedAccount);
        }
    } catch (err) {
        if (err.message.includes('at path "_id"')) {
            return notFoundRes(res, 'Account not found');
        }
        errorRes(res, err);
    }
};

exports.calculateAccountTotal = async (req, res) => {
    try {
        const { id } = req.params;
        const transactions = await transactionModel.find({ account: id });

        let totalRevenue = 0;
        let totalExpense = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === 'receita') {
                totalRevenue += transaction.value;
            } else if (transaction.type === 'despesa') {
                totalExpense += transaction.value;
            }
        });

        const total = totalRevenue - totalExpense;

        res.json({
            totalExpense,
            totalRevenue,
            total,
        });
    } catch (err) {
        errorRes(res, err);
    }
};

exports.deleteAccount = deleteDocument(accountModel);
