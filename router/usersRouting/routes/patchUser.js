const { updateUser } = require('../../../db/sqlite/sqlite3-data');
const HttpError = require('../../../helpers/http/HttpError');

const patchUser = async (req, res, id) => {
    try {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });       
        req.on('end', async () => {        
            const newUser = JSON.parse(body, (key, value) => {
                return (key == '' || key == 'name' || key == 'age') ? value : undefined;
            });

            await updateUser(id, newUser) // await updateUser passes try...catch
                .then(() => {
                    res.writeHead(200);
                    res.end("Updated successfully");
                }) 
                .catch(error => {  
                    if (error instanceof HttpError) {
                        res.writeHead(error.code);
                        res.end(JSON.stringify({ message: error.message }));
                    } else {
                        throw error;
                    } 
                });                      
        });
    } catch (error) {   
        throw error;    
    }    
};

module.exports = patchUser;