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
const selectByName = async (expenseName) => {
    [result] = await pool.query("select * from expenses where name LIKE ?", [`%${expenseName}%`])
    if (result.length === 0) return null
    return result[0]
}
const addExpense = async ({ name, amount, userIdCreator, teamId }) => {
    const [result] = await pool.query(
        "INSERT INTO expenses (name, amount, UserIDCreator, TeamID) VALUES (?, ?, ?, ?)",
        [name, amount, userIdCreator, teamId]
    );
    return result;
};

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
    const [result] = await pool.query(`
        SELECT e.* FROM expenses e 
        JOIN UsersExpenses ue ON e.Id = ue.ExpenseID 
        WHERE ue.UserID = ?
    `, [userId]);
    return result;
};

const selectAllByTeam = async (teamId) => {
    const [result] = await pool.query("SELECT * FROM expenses WHERE TeamID = ?", [teamId]);
    return result
};

module.exports = { selectAll, selectAllByUser, selectAllByTeam, selectById, selectByName, addExpense, updateById, deleteById }