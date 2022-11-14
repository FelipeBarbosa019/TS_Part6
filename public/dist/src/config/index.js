"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});
function query() {
    return __awaiter(this, void 0, void 0, function* () {
        const codeSQL = `
    CREATE TABLE accounts (
        id_user uuid,
        email varchar(255),
        name_user varchar(255),
        pass_user varchar(255)
    );
    `;
        try {
            const res = yield pool.query(codeSQL);
            console.log("Table account created\n");
            console.table(res.rows);
            return { err: null, data: res.rows };
        }
        catch (err) {
            console.log(err.stack);
            return { err: err };
        }
    });
}
query();
