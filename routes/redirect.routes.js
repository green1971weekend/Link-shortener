const {Router} = require("express");
const Link = require("../models/Link.js")

const router = Router();

// Allows to follow the shorten link by redirecting request to origin link.
router.get("/:code", async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code});

        if(link) {
            link.clicks++;
            await link.save();
            return res.redirect(link.from);
        } 

        res.status(404).json("Link not found");

    } catch (e) {
        res.status(500).json({message: "The server error occured."});
    }
})

// Export the defined router from the current js module.
module.exports = router;