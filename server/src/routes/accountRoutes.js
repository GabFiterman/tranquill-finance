/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Cria uma nova conta
router.post('/create-account', accountController.createAccount);
// Busca todas as contas
router.get('/get-all-accounts', accountController.getAllAccounts);
// Busca uma conta específica baseado em um _id
router.post('/get-account', accountController.getSpecificAccount);
// Faz update em qualquer informação de uma conta específica baseado em um _id
router.put('/update-account', accountController.updateAccount);
// Deleta uma conta baseado em um _id
router.delete('/delete-account', accountController.deleteAccount);

module.exports = router;
