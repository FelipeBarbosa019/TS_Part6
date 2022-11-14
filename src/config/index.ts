"use strict";
require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

async function query() {
    const codeSQL = `
    CREATE TABLE accounts (
        id_user uuid,
        email varchar(255),
        name_user varchar(255),
        pass_user varchar(255)
    );
    `;
    try {
        const res = await pool.query(codeSQL);
        console.log("Table account created\n");
        console.table(res.rows);
        return { err: null, data: res.rows };
    } catch (err: any) {
        console.log(err.stack);
        return { err: err };
    }
}

query();
// const query = await pool.query(
//     "CREATE TABLE accounts (id, email, name, password)"
// );
