/* eslint-disable no-undef */
const Accounts = require('../models/accountsModel');
const { create, read } = require('../common/crud');

exports.createAccount = async (req, res) => {
  try {
    const {
      alias,
      bank,
      account_type,
      balance,
      has_credit_card,
      total_credit,
      credit_used
    } = req.body;

    await create (Accounts, {
      alias,
      bank,
      account_type,
      balance,
      has_credit_card,
      total_credit,
      credit_used
    });
  } catch(err) {
    throw new Error (error)
  }
}

exports.getAllAccounts = async (req, res) => {
  try {
    await read (Accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDefault = (req, res) => {
  try {
    res.status(200).json({message: 'OK! Works!'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Outras funções para listar, atualizar, excluir contas, etc.
