/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    user_id: { type: String, required: true },
    alias: { type: String, required: true },
    bank: { type: String, required: true },
    type: { type: String, required: true },
    balance: { type: Number, required: false },
    credit_card: { type: Boolean, required: false },
    credit_limit: { type: Number, required: false },
    credit_used: { type: Number, required: false },
    updated_date: { type: Date },
    created_date: { type: Date },
});

module.exports = mongoose.model('Account', accountSchema);
