const { createUser } = require("../../../db/sqlite/sqlite3-data");

const postUser = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', async () => {
        const user = JSON.parse(body, (key, value) => {
            return (key == '' || key == 'name' || key == 'age') ? value : undefined;
        });

        const userId = await createUser(user);    
        res.writeHead(201);
        res.end(JSON.stringify( { id: userId }));
    });    
};

module.exports = postUser;