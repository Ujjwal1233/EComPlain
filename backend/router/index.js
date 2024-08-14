const express = require("express");
const userRouter = require("./user");
const replyRouter = require("./reply");
const complainRouter = require("./complain");
const extra = require("./extra");

const router = express.Router();

router.use("/user", userRouter);
router.use("/reply", replyRouter);
router.use("/complain", complainRouter);
router.use("/extra", extra);

module.exports = router;
