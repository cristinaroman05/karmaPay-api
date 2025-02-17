const bcrypt = require('bcryptjs')
const User = require("../models/user.model")


const register = async (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    try {
        const user = await User.addUser(req.body)
        res.json({ success: 'Usuario registrado con éxito', user })
    } catch (error) {
        next(error)
    }
}

module.exports = register