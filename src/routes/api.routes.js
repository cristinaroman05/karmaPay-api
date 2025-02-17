const router = require('express').Router();

router.use('/users', require('./api/users.routes'))
router.use('/teams', require('./api/teams.routes'))
router.use('/expenses', require('./api/expenses.routes'))

router.use('/login', require('./api/login.routes'))
router.use('/register', require('./api/register.routes'))
module.exports = router