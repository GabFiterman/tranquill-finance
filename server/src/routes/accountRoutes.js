/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Rota para criar uma nova conta

// Cria uma nova conta
router.post('/accounts', accountController.createAccount);
// Busca todas as contas
router.get('/get-all-accounts', accountController.getAllAccounts);

router.get('/get-kakaus', accountController.getAllKakaus);
router.post('/create-kakau', accountController.createKakau);
router.delete('/delete-kakau', accountController.deleteKakau);
router.put('/put-kakau-name', accountController.updateKakauName);
router.get('/', accountController.getDefault)
// Outras rotas para listar, atualizar, excluir contas, etc.

module.exports = router;
