/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Cria uma nova conta
router.post('/create', userController.createUser);
// Busca todas as contas
router.get('/get-all', userController.getAllUsers);
// Busca uma conta específica baseado em um _id
router.get('/:id', userController.getOneUser);
// Faz update em qualquer informação de uma conta específica baseado em um _id
router.put('/update', userController.updateUser);
// Deleta uma conta baseado em um _id
router.delete('/delete', userController.deleteUser);

module.exports = router;
