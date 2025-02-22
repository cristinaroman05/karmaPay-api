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
    const [result] = await pool.query("SELECT et.ExpenseID , u.Username, et.Assignation FROM UsersExpenses et JOIN users u ON et.UserID = u.Id WHERE et.UserID = ?", [userId]);
    return result;
};

const selectAllByTeam = async (teamId) => {
    const [result] = await pool.query("SELECT * FROM expenses WHERE TeamID = ?", [teamId]);
    return result
};

const getDepth = async (userId, teamId) => {
    const [result] = await pool.query("Select Sum(Amount)*(ue.Assignation /100) as Debes from expenses e Join users u on u.Id = e.UserIDCreator Join teams t on t.Id = e.TeamID join usersexpenses ue on e.Id = ue.ExpenseID and u.Id = ue.UserID where u.Id = ? and t.Id = ? group by ue.Assignation", [userId, teamId]);
    return result
};

module.exports = { selectAll, selectAllByUser, selectAllByTeam, selectById, selectByName, addExpense, updateById, deleteById, getDepth };