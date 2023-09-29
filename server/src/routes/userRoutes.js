/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Cria um novo usuário
router.post('/create', userController.createUser);
// Busca todas os usuários
router.get('/get-all', userController.getAllUsers);
// Busca uma usuário específico baseado em um _id
router.get('/:id', userController.getOneUser);
// Faz update em qualquer informação de uma usuário específico baseado em um _id
router.put('/update', userController.updateUser);
// Deleta uma usuário baseado em um _id
router.delete('/delete', userController.deleteUser);

module.exports = router;
