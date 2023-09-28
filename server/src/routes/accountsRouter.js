/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountsController');

// Rota para criar uma nova conta
router.post('/accounts', accountController.createAccount);
router.get('/accounts', accountController.getAllAccounts);
router.get('/', accountController.getDefault)
// Outras rotas para listar, atualizar, excluir contas, etc.

module.exports = router;
