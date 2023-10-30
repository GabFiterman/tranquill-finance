/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const { accountController } = require('../controllers');

// Cria uma nova conta
router.post('/create', accountController.createAccount);
// Busca todas as contas
router.get('/get-all', accountController.getAllAccounts);
// Busca uma conta específica baseado em um _id
router.get('/:id', accountController.getOneAccount);
// Busca todas as contas de um usuário baseados em um user_id
router.get('/user/:id', accountController.getAllAccountsFromUser);
// Faz update em qualquer informação de uma conta específica baseado em um _id
router.put('/update', accountController.updateAccount);
// Faz atualiza a conta com "receita" ou "despesa"
router.put('/update-balance', accountController.updateAccountBalance);
// Deleta uma conta baseado em um _id
router.delete('/delete', accountController.deleteAccount);

module.exports = router;
