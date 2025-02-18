const router = require('express').Router();
const { checkToken } = require('../middlewares/users.middleware')

router.use('/users', checkToken, require('./api/users.routes'))
router.use('/teams', checkToken, require('./api/teams.routes'))
router.use('/expenses', checkToken, require('./api/expenses.routes'))

router.use('/login', require('./api/login.routes'))
router.use('/register', require('./api/register.routes'))
module.exports = router