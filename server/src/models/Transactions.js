/* eslint-disable no-undef */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const transactionsSchema = new Schema({
    _id: ObjectId,
    value: { type: Number, required: true },
    description: { type: String, required: true },
    transaction_date: { type: Date, required: true },
    expected_date: { type: Date, required: true },
    categories: { type: [ObjectId], required: true },
    account: { type: ObjectId, required: true },
    payment_method: { type: String, required: true }
})

module.exports = mongoose.model('Transactions', transactionsSchema, 'transactions')
