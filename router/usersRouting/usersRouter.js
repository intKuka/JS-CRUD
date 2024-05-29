const getUsers = require('./routes/getUsers');
const getUserById = require('./routes/getUserById');
const postUser = require('./routes/postUser');
const deleteUser = require('./routes/deleteUser');
const patchUser = require('./routes/patchUser');

const usersRouter = (req, res) => {
    const id = parseInt(req.url.split('/')[3]);
    const method = req.method;

    if (!id && method === 'GET') {
        getUsers(req, res);
    } else if (id && method === 'GET') {
        getUserById(req, res, id);
    } else if (method === 'POST') {
       postUser(req, res);
    } else if (id && method === 'PATCH') {
        patchUser(req, res, id);
    } else if (id && method === 'DELETE') {
        deleteUser(req, res, id);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: `Route ${parsedUrl.path} not found` }));
    }
};

module.exports = usersRouter;