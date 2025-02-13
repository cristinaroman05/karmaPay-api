const router = require('express').Router();

router.use('/users', require('./api/users.routes'))
router.use('/groups', require('./api/groups.routes'))
router.use('/expenses', require('./api/expenses.routes'))
module.exports = router