import wishRoute from "./wish";
import * as express from "express";
const router = express.Router();

router.use('/wish', wishRoute);

export default router;