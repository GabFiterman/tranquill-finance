/* eslint-disable no-undef */
const UserSchema = require('../models/userModel')

exports.createUser = async (req, res) => {
    try {
        const {
            complete_name,
            user_name,
            gender,
            phone,
            profile_photo,
            cpf,
            born_date,
            register_date,
            email,
            password
        } = req.body

        if (
            !complete_name ||
            !user_name ||
            !gender ||
            !phone ||
            !profile_photo ||
            !cpf ||
            !born_date ||
            !register_date ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                error: "'complete_name', 'user_name', 'gender', 'phone', 'profile_photo', 'cpf', 'born_date', 'register_date', 'email', 'password' are required"
            })
        }

        const user = await UserSchema.create({
            complete_name,
            user_name,
            gender,
            phone,
            profile_photo,
            cpf,
            born_date,
            register_date,
            email,
            password
        })

        res.status(201).json({
            message: `Success! Youse User '${user_name} has been registered!'`,
            user
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserSchema.find().lean()
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}

exports.getSpecificUser = async (req, res) => {
    try {
        const { _id, complete_name, user_name, cpf } = req.body
        const query = {}

        if (_id) {
            query._id = _id
        }

        if (complete_name) {
            query.complete_name = complete_name
        }

        if (user_name) {
            query.user_name = user_name
        }


        if (cpf) {
            query.cpf = cpf
        }

        const user = await UserSchema.find(query).lean()
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const {
            _id,
            complete_name,
            user_name,
            gender,
            phone,
            profile_photo,
            cpf,
            born_date,
            register_date,
            email,
            password
        } = req.body; 

        if (!_id) {
            return res.status(400).json({ error: "'_id' are required." })
        }

        const updateDoc = await UserSchema.findOneAndUpdate(
            { _id },
            {
                complete_name,
                user_name,
                gender,
                phone,
                profile_photo,
                cpf,
                born_date,
                register_date,
                email,
                password
            },
            { new: true }
        )

        if (!updateDoc) {
            return res.status(404).json({ error: 'Document not found' })
        }
        res.status(200).json({ message: 'Update With Success', updateDoc })
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { _id } = req.body
        const deleteRes = await UserSchema.deleteOne({ _id }).lean()

        if (!deleteRes) {
            return res.status(404).json({ error: 'Document not found' })
        }
        res.status(200).json({ message: 'Delete With Success', deleteRes })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
