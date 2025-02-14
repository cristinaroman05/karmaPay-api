const pool = require('../config/db')
const profileImage = '../images/iconoPerfil.png'

const selectAll = async () => {
    [result] = await pool.query("select * from users")
    return result;
}
const selectById = async (userId) => {
    [result] = await pool.query("select * from users where Id = ?", [userId])
    if (result.length === 0) return null
    return result[0]
}
const selectByName = async (userName) => {
    [result] = await pool.query("select * from users where Name = ?", [userName])
    if (result.length === 0) return null
    return result[0]
}
const addUser = async ({ username, mail, password }) => {
    const [result] = await pool.query("insert into users (username, mail, password, img) values(?, ?, ?, ?)", [username, mail, password, profileImage])
    return result
}
const updateById = async (userId, { username, mail, password }) => {
    const [result] = await pool.query(
        "update users set username = ?, mail = ?, password = ? where id = ?",
        [
            username,
            mail,
            password,
            userId,
        ]
    )
    return result
}
const deleteById = async (userId) => {
    const [result] = await pool.query("delete from users where id = ?", [userId])
    return result
}


module.exports = { selectAll, selectById, selectByName, addUser, updateById, deleteById }