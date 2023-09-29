/* eslint-disable no-undef */
const AccountSchema = require('../models/accountModel')
const { createDocument, readAllDocuments, readOneDocument,  updateDocument, deleteDocument } = require ('../common/crud')

exports.createAccount = createDocument(AccountSchema);
exports.getAllAccounts = readAllDocuments(AccountSchema);
exports.getOneAccount = readOneDocument(AccountSchema);
exports.updateAccount = updateDocument(AccountSchema);
exports.deleteAccount = deleteDocument(AccountSchema);
