/* eslint-disable no-undef */
const { accountModel } = require('../models')
const { createDocument, readAllDocuments, readOneDocument,  updateDocument, deleteDocument } = require ('../common/crud')

exports.createAccount = createDocument(accountModel);
exports.getAllAccounts = readAllDocuments(accountModel);
exports.getOneAccount = readOneDocument(accountModel);
exports.updateAccount = updateDocument(accountModel);
exports.deleteAccount = deleteDocument(accountModel);
