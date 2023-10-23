/* eslint-disable no-undef */
const { errorRes, notFoundRes, successRes, createdRes } = require('./response')

const createDocument = (model) => {
    return async (req, res) => {
        try {
            const newData = new model(req.body)
            const createdData = await newData.save()
            if (!createdData) {
                notFoundRes(res)
            }
            createdRes(res, createdData)
        } catch (err) {
            errorRes(res, err)
        }
    }
}

const readAllDocuments = (model) => {
    return async (req, res) => {
        try {
            const data = await model.find().lean()

            if (!data || data == []) {
                notFoundRes(res)
            }

            successRes(res, data)
        } catch (err) {
            errorRes(res, err)
        }
    }
}

const readOneDocument = (model) => {
    return async (req, res) => {
        try {
            const query = {}
            query._id = req.params.id

            const data = await model.find(query).lean()

            if (!data || data == []) {
                notFoundRes(res)
            }
            successRes(res, data)
        } catch (err) {
            errorRes(res, err)
        }
    }
}

const readAllDocumentsFromUser = (model) => {
    return async (req, res) => {
        try {
            const query = {}
            query.user_id = req.params.id

            const data = await model.find(query).lean()

            if (!data || data == []) {
                notFoundRes(res)
            }
            successRes(res, data)
        } catch (err) {
            errorRes(res, err)
        }
    }
}

const updateDocument = (model) => {
    return async (req, res) => {
        try {
            const { _id } = req.body

            const updatedData = await model.findByIdAndUpdate(_id, req.body, { new: true })

            if (!updatedData) {
                res.status(404).json({ error: 'Document not found' })
            }

            successRes(res, updatedData)
        } catch (err) {
            errorRes(res, err)
        }
    }
}

const deleteDocument = (model) => {
    return async (req, res) => {
        try {
            const { _id } = req.body
            const deletedData = await model.deleteOne({ _id }).lean()

            if (!deletedData) {
                notFoundRes(res)
            }

            successRes(res, deletedData)
        } catch (err) {
            errorRes(res, err)
        }
    }
}

module.exports = {
    createDocument,
    readAllDocuments,
    readAllDocumentsFromUser,
    readOneDocument,
    updateDocument,
    deleteDocument
}
