/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    type: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value === 'receita' || value === 'despesa',
            message: 'Type must be "receita" or "despesa"',
        },
    },
    color: { type: String, required: true },
    created_date: { type: Date },
});

module.exports = mongoose.model('Category', categorySchema);
