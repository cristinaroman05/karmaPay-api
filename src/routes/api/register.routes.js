const register = require('../../controllers/register.controller')

const router = require('express').Router()

router.post('/', register)

module.exports = router