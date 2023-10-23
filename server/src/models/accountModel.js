/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    user_id: { type: String, required: true },
    alias: { type: String, required: true },
    bank: { type: String, required: true },
    account_type: { type: String, required: true },
    balance: { type: Number, required: false },
    has_credit_card: { type: Boolean, required: false },
    total_credit_limit: { type: Number, required: false },
    credit_used: { type: Number, required: false },
    updated_date: { type: Date },
});

module.exports = mongoose.model('Account', accountSchema);
