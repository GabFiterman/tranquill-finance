/* eslint-disable no-undef */
const { categoryModel } = require('../models');
const {
    createDocument,
    readAllDocuments,
    readOneDocument,
    updateDocument,
    deleteDocument,
} = require('../common/crud');

exports.createCategory = createDocument(categoryModel);
exports.getAllCategories = readAllDocuments(categoryModel);
exports.getOneCategory = readOneDocument(categoryModel);
exports.updateCategory = updateDocument(categoryModel);
exports.deleteCategory = deleteDocument(categoryModel);
