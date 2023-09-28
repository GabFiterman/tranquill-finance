/* eslint-disable no-undef */
const { errData, errorRes, successRes } = require('./response')
const mongoose = require('mongoose')

function create(model, populate = []) {
    return async (req, res) => {
        try {
            const newData = new model({
                _id: new mongoose.Types.ObjectId(),
                ...req.body
            })
            const createdData = await newData.save()
            const populatedData = await createdData.populate(...populate).execPopulate()
            successRes(res, populatedData)
        } catch (err) {
            errorRes(res, err)
        }
    }
}

function read(model, populate = []) {
    return async (req, res) => {
        try {
            const readedData = await model.find(...req.body, errData(res)).populate(...populate)
            successRes(res, readedData)
        } catch (err) {
            errorRes(res, err)
        }
    }
}

function update(model, populate = []) {
    return (req, res) => {
        req.body.update_at = new Date()
        return model
            .findByIdAndUpdate(req.params._id, req.body, { new: true }, errData(res))
            .populate(...populate)
    }
}

function remove(model) {
    return (req, res) => model.deleteOne({ _id: req.params._id }, errData(res))
}

module.exports = { read, create, update, remove }
