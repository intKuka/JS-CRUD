const { listUsers } = require('../../../db/sqlite/sqlite3-data');

const getUsers = async (req, res) => {
    const users = await listUsers();
    res.writeHead(200);
    res.end(JSON.stringify(users));  
};

module.exports = getUsers;