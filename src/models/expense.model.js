const pool = require('../config/db')


const selectAll = async () => {
    const [result] = await pool.query(`
        SELECT e.Id, e.Name, e.Amount, e.CreationDate, 
               u.Username AS Creator, t.Name AS Team 
        FROM expenses e
        JOIN users u ON e.UserIDCreator = u.Id
        JOIN teams t ON e.TeamID = t.Id
    `);
    return result;
};

const selectById = async (expenseId) => {
    const [result] = await pool.query(`
        SELECT e.Id, e.Name, e.Amount, e.CreationDate, 
               u.Username AS Creator, t.Name AS Team 
        FROM expenses e
        JOIN users u ON e.UserIDCreator = u.Id
        JOIN teams t ON e.TeamID = t.Id
        WHERE e.Id = ?
    `, [expenseId]);
    if (result.length === 0) return null;
    return result[0];
};
const selectByName = async (expenseName, teamId) => {
    [result] = await pool.query("SELECT * FROM expenses WHERE name LIKE ? AND TeamID = ?",
        [`%${expenseName}%`, teamId])
    if (result.length === 0) return null
    return result
}

const selectAssignation = async ({ expenseId, userId }) => {
    const [result] = await pool.query(
        "SELECT Assignation FROM UsersExpenses WHERE ExpenseID = ? AND UserID = ?",
        [expenseId, userId]
    );
    if (result.length === 0) return 0

    return result[0]
};
const addExpense = async ({ name, amount, userIdCreator, teamId }) => {
    const [result] = await pool.query(
        "INSERT INTO expenses (name, amount, UserIDCreator, TeamID) VALUES (?, ?, ?, ?)",
        [name, amount, userIdCreator, teamId]
    );
    return result;
};
const addAssignation = async ({ assignation, expenseId, userId }) => {
    const [result] = await pool.query("INSERT INTO UsersExpenses (Assignation, ExpenseID, UserID) VALUES (?, ?, ?)",
        [assignation, expenseId, userId,])
    return result;
}
const updateById = async (expenseId, { name, amount }) => {
    const [result] = await pool.query(
        "update expenses set name = ?, amount = ? where id = ?",
        [
            name,
            amount,
            expenseId
        ]
    )
    return result
}
const deleteById = async (expenseId) => {
    const [result] = await pool.query("delete from expenses where id = ?", [expenseId])
    return result
}

const selectAllByUser = async (userId) => {
    const [result] = await pool.query("SELECT et.ExpenseID , u.Username, et.Assignation FROM UsersExpenses et JOIN users u ON et.UserID = u.Id WHERE et.UserID = ?", [userId]);
    return result;
};

const selectAllByTeam = async (teamId) => {
    const [result] = await pool.query("SELECT * FROM expenses WHERE TeamID = ?", [teamId]);
    return result
};

const getDebt = async (userId, teamId) => {
    const [result] = await pool.query("SELECT ue.UserID, SUM(ue.Assignation) AS Debes FROM expenses e JOIN usersexpenses ue ON e.Id = ue.ExpenseID WHERE e.TeamID = ? and ue.UserId = ? GROUP BY ue.UserID; ", [userId, teamId]);
    return result
};

module.exports = { selectAll, selectAllByUser, selectAllByTeam, selectById, selectByName, selectAssignation, addExpense, addAssignation, updateById, deleteById, getDebt };


//SELECT 
/* ue.UserID,
    SUM(e.Amount * (ue.Assignation / 100)) AS Debes 
FROM expenses e
JOIN usersexpenses ue ON e.Id = ue.ExpenseID
WHERE e.TeamID = ?
    GROUP BY ue.UserID; */