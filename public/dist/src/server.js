"use strict";
const express = require("express");
const cors = require("cors");
const routerServer = require("./router/router.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = 8000;
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public/"));
app.use(routerServer);
app.listen(port, (err) => {
    if (err) {
        console.log("Problema na conexão com o servidor");
    }
    else {
        console.log(`Servidor ativo na porta: ${port}`);
    }
});
