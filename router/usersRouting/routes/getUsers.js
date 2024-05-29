const { listUsers } = require('../../../db/inMemory/data');

const getUsers = async (req, res) => {
    const users = await listUsers();
    res.writeHead(200);
    res.end(JSON.stringify(users));  
};

module.exports = getUsers;