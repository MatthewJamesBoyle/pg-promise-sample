const pgp = require('pg-promise')();


// Get the values for these variables from configuration
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const database = process.env.DB_NAME

const dbConn = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);


function createSingleton(name, create) {
    let s = Symbol.for(name);
    let scope = global[s];
    if (!scope) {
        scope = {...create()};
        global[s] = scope;
    }
    return scope;
}

export function getDB() {
    return createSingleton('my-app-db-space', () => {
        return {
            db: dbConn
        };
    });
}

module.exports = {getDB}