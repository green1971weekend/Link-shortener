const { Router } = require("express");
const router = Router(); 
const Link = require("../models/Link.js");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require("shortid");

// /generate endpoint is processing a giving link and returns encoded link.
router.post("/generate", auth, async (req, res) => {
    try {
        const baseUrl = config.get("baseUrl");
        const {from} = req.body;

        // shortid.generate() - generates the unique code.
        const code = shortid.generate();
        const existing =  await Link.findOne({from});
        if(existing) {
            return res.json({link: existing});
        }

        const to = baseUrl + "/t/" + code;
        const link = new Link({
            code, to, from, owner: req.user.userId
        });
        await link.save();

        res.status(201).json({link});
    } catch (e) {
        res.status(500).json({message: "The server error occured by generating new link."});
    }
});

// Returns all links referenced to a certain user.
router.get("/", auth, async (req, res) => {
    try {
        // req.user property added in auth.middleware.js, userId is property of our signed token.
        const links = await Link.find({owner: req.user.userId});
        res.json(links);
    } catch (e) {
        res.status(500).json({message: "The server error occured."});
    }
});

// Returns specific link by giving its id - /:id
router.get("/:id", auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (e) {
        res.status(500).json({message: "The server error occured."});
    }
});

// Export the defined router from the current js module.
module.exports = router;