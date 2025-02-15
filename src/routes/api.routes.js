const router = require('express').Router();

router.use('/users', require('./api/users.routes'))
router.use('/teams', require('./api/teams.routes'))
router.use('/expenses', require('./api/expenses.routes'))
module.exports = router