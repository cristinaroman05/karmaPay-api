const Expense = require('../models/expense.model')

const getAll = async (req, res, next) => {
    try {
        const expenses = await Expense.selectAll()
        res.json(expenses)
    } catch (error) {
        next(error)
    }
}
const getById = async (req, res, next) => {
    const { expenseId } = req.params
    try {
        const expense = await Expense.selectById(expenseId)
        if (!expense) {
            res.status(404).json({ message: 'El id del gasto no existe' })
        }
        res.json(expense)
    } catch (error) {
        next(error)
    }
}
const getByName = async (req, res, next) => {
    const { expenseName, teamId } = req.params
    try {
        const expense = await Expense.selectByName(expenseName, teamId)

        res.json(expense)
    } catch (error) {
        next(error)
    }
}

const getAllByUser = async (req, res) => {
    const { userId } = req.params
    try {
        const expenses = await Expense.selectAllByUser(userId)

        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllByTeam = async (req, res) => {
    const { teamId } = req.params
    try {
        const expenses = await Expense.selectAllByTeam(teamId);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const create = async (req, res, next) => {
    const { name, amount, teamId, assignations } = req.body;
    const userIdCreator = req.user.Id
    console.log(req.body)
    try {
        if (!teamId) {
            return res.status(400).json({ message: "TeamID es obligatorio" });
        }
        const result = await Expense.addExpense({ name, amount, userIdCreator, teamId });

        for (let assig of assignations) {
            await Expense.addAssignation({ assignation: assig.Assignation, expenseId: result.insertId, userId: assig.UserId })
        }
        const newExpense = await Expense.selectById(result.insertId);
        res.status(201).json(newExpense);
    } catch (error) {
        next(error);
    }
}
const updateOne = async (req, res, next) => {
    try {
        const { expenseId } = req.params
        await Expense.updateById(expenseId, req.body)
        const expenseUpdated = await Expense.selectById(expenseId)
        res.json({ message: 'gasto actualizado', expenseUpdated })
    } catch (error) {
        next(error)
    }
}
const deleteOne = async (req, res, next) => {
    try {
        const { expenseId } = req.params
        const expenseDeleted = await Expense.selectById(expenseId)
        await Expense.deleteById(expenseId)
        res.json({ message: 'gasto eliminado', expenseDeleted })
    } catch (error) {
        next(error)
    }
}

module.exports = { getAll, getAllByUser, getAllByTeam, getById, getByName, create, updateOne, deleteOne }