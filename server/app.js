/* eslint-disable no-undef */
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

app
.use(cors())
.use(logger('dev'))
.use(express.json())

// Configure a conexão com o MongoDB
const mongoDBUri = `mongodb+srv://${process.env.DB_MONGO_USER}:${process.env.DB_MONGO_PASSWORD}@tranquill-finance.o3jcxng.mongodb.net/${process.env.DB_MONGO_DATABASE}`;
mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
    console.log(`\n\n###############################################\nConexão com o MongoDB estabelecida com sucesso!\n###############################################\n\n`);
});

const { accountRoutes, userRoutes, categoryRoutes, transactionRoutes } = require('./src/routes');

app.use('/account', accountRoutes);
app.use('/user', userRoutes);
app.use('/category', categoryRoutes);
app.use('/transaction', transactionRoutes);



module.exports = app;