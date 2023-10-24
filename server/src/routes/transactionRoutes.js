/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const { transactionController } = require('../controllers');

// Cria uma nova categoria
router.post('/create', transactionController.createTransaction);
// Busca todas as categorias
router.get('/get-all', transactionController.getAllTransactions);
// Busca uma categoria específica baseado em um _id
router.get('/:id', transactionController.getOneTransaction);
// Busca todas as transações de um usuário baseados em um user_id
router.get('/user/:id', transactionController.getAllTransactionsFromUser);
// Faz update em qualquer informação de uma categoria específica baseado em um _id
router.put('/update', transactionController.updateTransaction);
// Deleta uma categoria baseado em um _id
router.delete('/delete', transactionController.deleteTransaction);

module.exports = router;
