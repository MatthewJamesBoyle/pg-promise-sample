const pgp = require('pg-promise')();


// Get the values for these variables from configuration
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const database = process.env.DB_NAME

const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);

function getSingleton(name, defaults) {
    const s = Symbol.for(name); // get global symbol
    let scope = global[s]; // get scope from the global
    if (!scope) {
        scope = {...defaults || {}}; // create singleton scope, with optional defaults
        global[s] = scope; // save our singleton in the global scope
    }
    return scope;
}

function getDB() {
    // get singleton, set db and pgp in it, if for the first time:
    return getSingleton('my-app-singleton-space', {db, pgp});
}


module.exports = {getDB}