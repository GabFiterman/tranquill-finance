/* eslint-disable no-undef */
const { userModel } = require('../models/userModel')
const { createDocument, readAllDocuments, readOneDocument,  updateDocument, deleteDocument } = require ('../common/crud')

exports.createUser = createDocument(userModel);
exports.getAllUsers = readAllDocuments(userModel);
exports.getOneUser = readOneDocument(userModel);
exports.updateUser = updateDocument(userModel);
exports.deleteUser = deleteDocument(userModel);
