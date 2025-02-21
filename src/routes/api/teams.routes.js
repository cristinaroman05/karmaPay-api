const { getAll, getById, getByName, create, updateOne, deleteOne, getByCategory, getOwnerById } = require('../../controllers/teams.controller');


const router = require('express').Router();

router.get('/', getAll)
router.get('/:teamId', getById)
router.get('/name/:teamName', getByName)
router.get('/category/:category', getByCategory)
router.get('/owner/:teamId', getOwnerById)

router.post('/create', create)
router.put('/:teamId', updateOne)
router.delete('/:teamId', deleteOne)



module.exports = router