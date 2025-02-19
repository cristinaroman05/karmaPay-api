const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const checkToken = async (req, res, next) => {
    /* const token = req.headers['authorization']
    let payload;
    if (!token) {
        return res.status(403).json({ message: 'Debes incluir la cabecera authorization' })
    }
    try {
        payload = jwt.verify(token, 'clave')
    } catch (error) {
        return res.status(403).json({ message: 'El token no es correcto' })
    }
    const user = await User.selectById(payload.userId)
    if (!user) {
        return res.status(403).json({ message: 'El usuario no es correcto' })
    }
    req.user = user; */
    req.user = { Id: 1 }
    next()
}
const checkAdmin = async (req, res, next) => {
    const role = req.user.Role
    if (role !== 'owner') {
        return res.status(403).json({ message: 'No estás autorizado' })
    }

    next()
}
const checkUsersTeam = async (req, res, next) => {
    const { idgroup } = req.params;
    const userId = req.user.Id;
    const users = await User.selectAllByGroup(idgroup);
    const user = await User.selectById(userId)
    if (users.Contains(user) === false) {
        return res.status(403).json({ message: `El usuario ${userId} no pertenece a este grupo` })
    }

    next()
}

module.exports = { checkToken, checkAdmin, checkUsersTeam }