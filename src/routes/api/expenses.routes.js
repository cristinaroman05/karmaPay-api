const { getAll, getById, getByName, create, updateOne, deleteOne, getAllByTeam, getAllByUser, getDebt } = require('../../controllers/expenses.controller');


const router = require('express').Router();

router.get('/', getAll)
router.get('/:expenseId', getById)
router.get('/name/:expenseName/:teamId', getByName)
router.get('/team/:teamId', getAllByTeam)
router.get('/user/:userId', getAllByUser)
router.get('/getDebt/:teamId/:userId', getDebt)

router.post('/create', create)
router.put('/:expenseId', updateOne)
router.delete('/:expenseId', deleteOne)


module.exports = router