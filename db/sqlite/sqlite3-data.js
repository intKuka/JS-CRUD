const { error } = require('console');
const HttpError = require('../../helpers/http/HttpError');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("local.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`);

function listUsers() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users`;
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
            }

            resolve(rows);            
        });
    });
}

function findUserById(id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else if (!row) {
                reject(new HttpError(404, "User not found"));
            }

            resolve(row);
        });
    });
}

function createUser(user) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (name, age) VALUES (?, ?)`;
        db.run(sql, [user.name, user.age], function(err) {
            if (err) {
                reject(err);
            }

            resolve(this.lastID);
        });
    });    
}

function updateUser(id, newUser) {
    return new Promise(async (resolve, reject) => {
        await findUserById(id)
            .catch(error => reject(error));

        for (const key in newUser) {
            const sql = `UPDATE users SET ${key} = ? WHERE id = ?`;
            db.run(sql, [newUser[key], id], function(err) {
                if (err) {
                    reject(err);
                }  
            });
        }
        resolve();        
    });
}

function removeUser(id) {
    return new Promise(async (resolve, reject) => {
        await findUserById(id)
            .catch(error => reject(error));

        const sql = `DELETE FROM users WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            }  
            resolve();
        });
    });
}

module.exports = {
    listUsers,
    findUserById,
    createUser,
    updateUser,
    removeUser
};



