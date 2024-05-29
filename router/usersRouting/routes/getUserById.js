const { findUserById } = require('../../../db/inMemory/data');
const HttpError = require('../../../helpers/http/HttpError');

const getUserById = async (req, res, id) => {
    try {
        const user = await findUserById(id);
        res.writeHead(200);
        res.end(JSON.stringify(user));
    } catch (error) {
        if (error instanceof HttpError) {
            res.writeHead(error.code);
            res.end(JSON.stringify({ message: error.message }));
        } else {
            throw error;
        }        
    }    
};

module.exports = getUserById;