import { Router } from "express";
import isAuth from "../middleware/auth";
import inbound from "../controller/inbound";

const router = Router()

router.post('/inbound/sms', isAuth, inbound)


export default router