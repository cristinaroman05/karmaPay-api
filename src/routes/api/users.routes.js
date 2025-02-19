const login = require('../../controllers/login.controller');
const register = require('../../controllers/register.controller');
const { getAll, getById, getByName, create, updateOne, deleteOne, getByMail } = require('../../controllers/users.controller');
const { checkToken } = require('../../middlewares/users.middleware');

const router = require('express').Router();

router.get('/team/:teamId', checkToken, getAll)
router.get('/:userId', checkToken, getById)
router.get('/name/:userName/:teamId', checkToken, getByName)
router.get('/mail/:mail', checkToken, getByMail)

router.post('/create', create)
router.post('/login', login)
router.post('/register', checkToken, register)
router.put('/update', checkToken, updateOne)
router.delete('/:userId', checkToken, deleteOne)


module.exports = router