const { getAll, getById, getByName, create, updateOne, deleteOne } = require('../../controllers/expenses.controller');

const router = require('express').Router();

router.get('/', getAll)
router.get('/:expenseId', getById)
router.get('/name/:expenseName', getByName)

router.post('/create', create)
router.put('/:expenseId', updateOne)
router.delete('/:expenseId', deleteOne)


module.exports = router