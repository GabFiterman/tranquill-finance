/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const transactionSchema = new Schema({
    user_id: { type: String, required: true },
    value: { type: Number, required: true },
    type: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value === 'receita' || value === 'despesa',
            message: 'type must be "receita" or "despesa"',
        },
    },
    description: { type: String, required: true },
    date_completed: { type: Date, required: true },
    date_expected: { type: Date, required: false },
    category: { type: ObjectId, required: true },
    account: { type: ObjectId, required: true },
    payment_method: { type: String, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);
