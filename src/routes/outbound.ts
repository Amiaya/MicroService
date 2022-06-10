import { Router } from "express";
import isAuth from "../middleware/auth";
import outbound from "../controller/outbound";

const router = Router()

router.post('/outbound/sms', isAuth, outbound)
export default router