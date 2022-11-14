"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const controller_2 = require("../controller");
const router = (0, express_1.default)();
router.post("/accounts", controller_1.register);
router.post("/accounts/login", controller_2.login);
router.patch("/accounts", controller_1.update);
module.exports = router;
