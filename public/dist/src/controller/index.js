"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.login = exports.register = void 0;
const users = [];
const { v4: uuidv4 } = require("uuid");
function register(req, res) {
    const id = uuidv4();
    const sessionID = uuidv4();
    const object = {
        email: req.body.email,
        name: req.body.name,
        id: id,
    };
    const object2 = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.pass,
        id: id,
        sessionID: sessionID,
    };
    users.push(object2);
    //foreach para atualizar o cadastro
    res.cookie("token", sessionID);
    res.send(object);
}
exports.register = register;
function login(req, res) {
    if (!req.cookies.token) {
        const check = users.find((user) => user.email === req.body.email &&
            user.password === req.body.password);
        if (!check) {
            const error = {
                Erro: "Email ou senha incorretos",
            };
            res.json(error);
            return;
        }
        const sessionID = uuidv4();
        //foreach para atualizar o cadastro
        res.cookie("token", sessionID);
        console.log("Cookies: ", req.cookies.token);
        res.json({ id: check.id });
    }
    else {
        const check = users.find((user) => user.sessionID === req.cookies.token);
        if (!check) {
            const check2 = users.find((user) => user.email === req.body.email &&
                user.password === req.body.password);
            if (!check2) {
                const error = {
                    Erro: "Email ou senha incorretos",
                };
                res.json(error);
                return;
            }
            const sessionID = uuidv4();
            //foreach para atualizar o cadastro
            res.cookie("token", sessionID);
            console.log("Cookies: ", req.cookies.token);
            res.json({ id: check2.id });
            return;
        }
        res.json({ id: check.id });
    }
}
exports.login = login;
function update(req, res) {
    const object = {
        email: req.body.email,
        name: req.body.name,
        pass: req.body.pass,
    };
    users.forEach((element) => {
        if (req.cookies.token === element.sessionID) {
            element.name = object.name;
            element.email = object.email;
            res.send(element);
        }
    });
}
exports.update = update;
