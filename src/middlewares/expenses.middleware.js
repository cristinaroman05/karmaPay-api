const Expenses = require('../models/expense.model');
//     `, [userId]);
const checkUserIDCreator = async (req, res, next) => {
    const { idexpense } = req.params;
    const expense = await Expenses.selectById(idexpense);
    const creator = expense.UserIDCreator;
    if (creator !== req.user.id) {
        return res.status(403).json({ message: 'No estás autorizado' })
    }

    next()
}

const checkExpenseTeam = async (req, res, next) => {
    const { idgroup } = req.params;
    const userId = req.user.id;
    const expenseUsers = await Expenses.selectAllByUser(userId);
    expenseUsers.forEach(expense => {
        if (expense.TeamID !== idgroup) {
            return res.status(403).json({ message: `el expense ${expense.id} no pertenece a este grupo` })
        }
    });

    

    next()
}

module.exports = { checkUserIDCreator, checkExpenseTeam }