const { getAll, getById, getByName, create, updateOne, deleteOne, getAllByTeam, getAllByUser } = require('../../controllers/expenses.controller');
const { getDepth } = require('../../models/expense.model');

const router = require('express').Router();

router.get('/', getAll)
router.get('/:expenseId', getById)
router.get('/name/:expenseName/:teamId', getByName)
router.get('/team/:teamId', getAllByTeam)
router.get('/user/:userId', getAllByUser)
router.get('/getDepth/:teamId/:userId', getDepth)

router.post('/create', create)
router.put('/:expenseId', updateOne)
router.delete('/:expenseId', deleteOne)


module.exports = router