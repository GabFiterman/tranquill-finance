/* eslint-disable no-undef */
const UserSchema = require('../models/userModel')
const { createDocument, readAllDocuments, readOneDocument,  updateDocument, deleteDocument } = require ('../common/crud')

exports.createUser = createDocument(UserSchema);
exports.getAllUsers = readAllDocuments(UserSchema);
exports.getOneUser = readOneDocument(UserSchema);
exports.updateUser = updateDocument(UserSchema);
exports.deleteUser = deleteDocument(UserSchema);
