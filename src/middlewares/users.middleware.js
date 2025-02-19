const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Team = require('../models/team.model')
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
const checkOwner = async (req, res, next) => {
    const userId = Number(req.user.Id)
    const team = await Team.selectById(Number(req.params.teamId))
    const ownerId = team.Owner

    if (ownerId !== userId) {
        return res.status(403).json({ message: 'No estás autorizado' })
    }
    next()
}
const checkUserTeam = async (req, res, next) => {
    const users = await User.selectAll(Number(req.params.teamId))
    const usersTeam = users.map(user => user.Id)
    const userIncluded = usersTeam.includes(Number(req.user.Id))
    if (!userIncluded) {
        return res.status(403).json({ message: 'No estás autorizado' })
    }
    next()
}
const checkUsersTeam = async (req, res, next) => {
    const { idgroup } = req.params;
    const userId = req.user.Id;
    const users = await User.selectAllByGroup(idgroup);
    const user = await User.selectById(userId)
    if (users.contains(user) === false) {
        return res.status(403).json({ message: `El usuario ${userId} no pertenece a este grupo` })
    }
}
module.exports = { checkToken, checkOwner, checkUsersTeam }
