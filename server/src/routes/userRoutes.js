/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Cria uma nova conta
router.post('/create-user', userController.createUser);
// Busca todas as contas
router.get('/get-all-users', userController.getAllUsers);
// Busca uma conta específica baseado em um _id
router.post('/get-user', userController.getSpecificUser);
// Faz update em qualquer informação de uma conta específica baseado em um _id
router.put('/update-user', userController.updateUser);
// Deleta uma conta baseado em um _id
router.delete('/delete-user', userController.deleteUser);

module.exports = router;
