const User = require('../models/user.model')


const getAll = async (req, res, next) => {
    const { teamId } = req.params
    try {
        const users = await User.selectAll(teamId)
        res.json(users)
    } catch (error) {
        next(error)
    }
}
const getById = async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await User.selectById(userId)
        if (!user) {
            res.status(404).json({ message: 'El id del usuario no existe' })
        }
        res.json(user)
    } catch (error) {
        next(error)
    }
}
const getByName = async (req, res, next) => {
    const { userName } = req.params
    try {
        const user = await User.selectByName(userName)
        if (!user) {
            res.status(404).json({ message: 'El nombre del usuario no existe' })
        }
        res.json(user)
    } catch (error) {
        next(error)
    }
}
const getByMail = async (req, res, next) => {
    const { mail } = req.params
    try {
        const user = await User.selectByMail(mail)
        if (!user) {
            res.status(404).json({ message: 'El email del usuario no existe' })
        }
        res.json(user)
    } catch (error) {
        next(error)
    }
}
const create = async (req, res, next) => {
    try {
        const result = await User.addUser(req.body);
        const newUser = await User.selectById(result.insertId);
        res.json(newUser);
    } catch (error) {
        next(error);
    }
}
const updateOne = async (req, res, next) => {
    const userId = req.user.Id

    try {
        await User.updateById(userId, req.body)
        const userUpdated = await User.selectById(userId)
        res.json({ message: 'Usuario actualizado', userUpdated })
    } catch (error) {
        next(error)
    }
}
const deleteOne = async (req, res, next) => {
    try {
        const { userId } = req.params
        const userDeleted = await User.selectById(userId)
        await User.deleteById(userId)
        res.json({ message: 'Usuario eliminado', userDeleted })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAll, getById, getByName, getByMail, create, updateOne, deleteOne }