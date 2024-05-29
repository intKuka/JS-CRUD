const { updateUser } = require('../../../db/inMemory/data');
const HttpError = require('../../../helpers/http/HttpError');

const patchUser = async (req, res, id) => {
    try {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            const newUser = JSON.parse(body, (key, value) => {
                return key == 'id' ? undefined : value;
            });
            await updateUser(id, newUser);
            res.writeHead(200);
            res.end();
        });   
        
    } catch (error) {
        if (error instanceof HttpError) {
            res.writeHead(error.code);
            res.end(JSON.stringify({ message: error.message }));
        } else {
            throw error;
        } 
    }    
};

module.exports = patchUser;