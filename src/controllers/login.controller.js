const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/user.model")


const login = async (req, res, next) => {
    const user = await User.selectByMail(req.body.mail)
    if (!user) {
        return res.status(401).json({ message: 'Email y/o contraseña incorrectos' })
    }
    const match = bcrypt.compareSync(req.body.password, user.Password)
    if (!match) {
        return res.status(401).json({ message: 'Email y/o contraseña incorrectos' })
    }
    res.json({
        success: 'Login correcto', token: jwt.sign({
            userId: user.Id,
            userRole: user.role
        }, 'clave')
    });
}
module.exports = login