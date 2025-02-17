const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const checkToken = async (req, res, next) => {
    const token = req.headers['authorization']
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
    req.user = user;
    next()
}
const checkAdmin = async (req, res, next) => {
    const role = req.user.Role
    if (role !== 'owner') {
        return res.status(403).json({ message: 'No estás autorizado' })
    }

    next()
}

module.exports = { checkToken, checkAdmin }