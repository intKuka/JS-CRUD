const HttpError = require("../../helpers/http/HttpError");

const users = [];
let currentId = 1;

function listUsers() {
    return new Promise((resolve) => {
        resolve(users);
    });
}

function findUserById(id) {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === id);               
        if (user) {            
            resolve(user);
        }        

        reject(new HttpError(404, "User not found"));
    });
}

function createUser(user) {
    return new Promise((resolve) => {
        user.id = currentId++;
        users.push(user);
        resolve(user.id);
    });    
}

function updateUser(id, newUser) {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === id);               
        if (user) {   
            Object.assign(user, newUser);
            resolve();
        }        

        reject(new HttpError(404, "User not found"));
    });
}

function removeUser(id) {
    return new Promise((resolve, reject) => {
        let userIndex = users.findIndex(user => user.id === id);               
        if (userIndex > -1) {   
            users.splice(userIndex, 1)
            resolve();
        }        

        reject(new HttpError(404, "User not found"));
    });
}

module.exports = {
    listUsers,
    findUserById,
    createUser,
    updateUser,
    removeUser
};



