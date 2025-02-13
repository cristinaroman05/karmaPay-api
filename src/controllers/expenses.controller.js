const getAll = (req, res, next) => {
    res.send('getAll expenses');
}
const getById = (req, res, next) => {
    res.send('getById expense');
}
const getByName = (req, res, next) => {
    res.send('getByName expense');
}
const create = (req, res, next) => {
    res.send('create expense');
}
const updateOne = (req, res, next) => {
    res.send('update expense');
}
const deleteOne = (req, res, next) => {
    res.send('delete expense');
}

module.exports = { getAll, getById, getByName, create, updateOne, deleteOne }