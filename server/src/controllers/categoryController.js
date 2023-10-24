/* eslint-disable no-undef */
const { categoryModel } = require('../models');
const {
    createDocument,
    readAllDocuments,
    readOneDocument,
    readAllDocumentsFromUser,
    updateDocument,
    deleteDocument,
} = require('../common/crud');

exports.createCategory = createDocument(categoryModel);
exports.getAllCategories = readAllDocuments(categoryModel);
exports.getOneCategory = readOneDocument(categoryModel);
exports.getAllCategoriesFromUser = readAllDocumentsFromUser(categoryModel);
exports.updateCategory = updateDocument(categoryModel);
exports.deleteCategory = deleteDocument(categoryModel);
