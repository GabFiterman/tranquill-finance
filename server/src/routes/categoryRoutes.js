/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const { categoryController } = require('../controllers');

// Cria uma nova categoria
router.post('/create', categoryController.createCategory);
// Busca todas as categorias
router.get('/get-all', categoryController.getAllCategories);
// Busca uma categoria específica baseado em um _id
router.get('/:id', categoryController.getOneCategory);
// Busca todas as contas de um usuário baseados em um user_id
router.get('/user/:id', categoryController.getAllCategoriesFromUser);
// Faz update em qualquer informação de uma categoria específica baseado em um _id
router.put('/update', categoryController.updateCategory);
// Deleta uma categoria baseado em um _id
router.delete('/delete', categoryController.deleteCategory);

module.exports = router;
