const { removeUser } = require('../../../db/sqlite/sqlite3-data');
const HttpError = require('../../../helpers/http/HttpError');

const deleteUser = async (req, res, id) => {
    try {
        await removeUser(id);
        res.writeHead(200);
        res.end("Deleted successfully");
    } catch (error) {
        if (error instanceof HttpError) {
            res.writeHead(error.code);
            res.end(JSON.stringify({ message: error.message }));
        } else {
            throw error;
        } 
    }    
};

module.exports = deleteUser;