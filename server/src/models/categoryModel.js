/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    category_name: { type: String, required: true },
    category_type: { type: String, required: true, enum: ['Despesa', 'Receita'] },
    category_color: { type: String, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
