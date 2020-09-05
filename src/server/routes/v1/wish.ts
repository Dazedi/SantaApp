import * as express from "express";
import WishController from "../../controllers/WishController";
const router = express.Router();

router.route('/')
    .post(WishController.createWish);

export default router;