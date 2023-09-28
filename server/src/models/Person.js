/* eslint-disable no-undef */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const personSchema = new Schema({
    _id: ObjectId,
    complete_name: { type: String, required: true },
    user_name: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    profile_photo: { type: String, required: true },
    cpf: { type: String, required: true },
    born_date: { type: Date, required: true },
    register_date: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    updated_date: { type: Date }
})

module.exports = mongoose.model('Person', personSchema, 'person')
