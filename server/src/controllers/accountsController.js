/* eslint-disable no-undef */
const Accounts = require('../models/accountsModel');
const KakauSchema = require('../models/KakauModel')
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

exports.getAllKakaus = async (req, res)  => {
  try {
    const mongoRes = await KakauSchema.find().lean();
    res.status(200).json({message: 'Works okay!', mongoRes});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.createKakau = async (req, res) => {
  try {
    const { type, name } = req.body;
    const mongoRes = await KakauSchema.create({type, name});
    res.status(200).json({message: 'Create test OKAY!!', mongoRes});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


exports.updateKakauName = async (req, res) => {
  try {
    const { name, new_name } = req.body;

    if (!name || !new_name) {
      return res.status(400).json({ error: "'name' and 'new_name' are required."});
    }

    const updateDoc = await KakauSchema.findOneAndUpdate(
      { name: query },
      { name: new_name },
      { new: true }
    ).lean();

    if(!updateDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(200).json({message: 'Update With Success', updateDoc});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteKakau = async (req, res) => {
  try {
    const { name } = req.body;
    const deleteRes = await KakauSchema.deleteOne({name}).lean();
    if(!deleteRes) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.status(200).json({message: 'Delete With Success', deleteRes});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Outras funções para listar, atualizar, excluir contas, etc.
