/* eslint-disable no-undef */
const AccountSchema = require('../models/accountModel');

exports.createAccount = async (req, res) => {
    try {
        const { alias, bank, account_type, balance, has_credit_card, total_credit, credit_used } =
            req.body

        // Retorna erro se não preeencher os campos obrigatórios
        if (!alias || !bank || !account_type) {
            return res.status(400).json({
                error: "'alias', 'bank' and 'account_type' are required"
            })
        }

        const accounts = await AccountSchema.create({
            alias,
            bank,
            account_type,
            balance,
            has_credit_card,
            total_credit,
            credit_used
        })

        res.status(201).json({
            message: `Success! Your account ${alias} has been created`,
            accounts
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
        throw new Error(error)
    }
}

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await AccountSchema.find().lean()
        res.status(200).json({ accounts })
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}

exports.getSpecificAccount = async (req, res) => {
    try {
        const { alias, bank, account_type } = req.body
        const query = {}

        if (alias) {
            query.alias = alias
        }

        if (bank) {
            query.bank = bank
        }

        if (account_type) {
            query.account_type = account_type
        }

        const account = await AccountSchema.find(query).lean()
        res.status(200).json({ account })
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateAccount = async (req, res) => {
    try {
        const {
            _id,
            alias,
            bank,
            account_type,
            balance,
            has_credit_card,
            total_credit,
            credit_used
        } = req.body

        if (!_id) {
            return res.status(400).json({ error: "'_id' are required." })
        }

        const updateDoc = await AccountSchema.findOneAndUpdate(
            { _id },
            {
                alias,
                bank,
                account_type,
                balance,
                has_credit_card,
                total_credit,
                credit_used
            },
            { new: true }
        )

        if (!updateDoc) {
            return res.status(404).json({ error: 'Document not found' })
        }
        res.status(200).json({ message: 'Update With Success', updateDoc })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const { _id } = req.body;
        const deleteRes = await AccountSchema.deleteOne({ _id }).lean();

        if(!deleteRes) {
            return res.status(404).json({ error: 'Document not found' })
        }
        res.status(200).json({ message: 'Delete With Success', deleteRes })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
