import express2 from "express";
import { register, update } from "../controller";
import { login } from "../controller";

const router = express2();

router.post("/accounts", register);

router.post("/accounts/login", login);

router.patch("/accounts", update);

module.exports = router;
