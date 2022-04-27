const express = require("express");
const router = express.Router();
const { decrypt } = require("../../../../../crypto.js");

router.post("/", async (req, res) => {

    const { code, returnedCode } = req.body;

    const decryped = decrypt(returnedCode);

    console.log("decryped", decryped);

    if (code === decryped) {
        res.status(200).json({
            message: "Successfully matched both codes!",
            success: true
        });
    } else {
        res.status(200).json({
            message: "Code does NOT match!",
            success: false
        });
    }
});

module.exports = router;