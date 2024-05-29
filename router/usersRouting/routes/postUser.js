const { createUser } = require("../../../db/inMemory/data");

const postUser = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', async () => {
        const user = JSON.parse(body);
        const userId = await createUser(user);
    
        res.writeHead(201);
        res.end(JSON.stringify( { id: userId }));
    });    
};

module.exports = postUser;