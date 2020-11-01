const {Router} = require("express");
const router = Router();
const User = require("../models/User.js");

// Library for hashing passwords.
const bcrypt = require("bcryptjs"); 

// Library for validation of the input data on the server side.
const {check, validationResult} = require("express-validator");

// Library for generating json web token.
const jwt = require("jsonwebtoken");

//---------------------------------------------------------------------------------------//

// Defines a new post endpoint for register users.
router.post("/register",
 [
    //Input data validation checking
    check("email", "Incorrect email").isEmail(),
    check("password", "Minimal length of the password value must be 8 symbols").isLength({min: 8})
 ],
 async (req, res) => {
    try {
        const errors = validationResult(req); // validationResult validates input data.
        if(!errors.isEmpty) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect input data for registration."
            })
        }  

        const {email, password} = req.body; // The data dispatched from front-end.

        const candidate = await User.findOne({ email }); //Looking for coincidences between all existing users in mongoDB.
        if(candidate) {
            return res.status(400).json({message: "User with this email already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});

        await user.save(); // Save user to the mongoDB.

        res.status(201).json({message: "New user has been created"});

    } catch (e) {
        res.status(500).json({message: "The server error occured by registering a new user."})
    }
});

// Defines a new post endpoint for login users.
router.post("/login",
[
    check("email", "Input correct email").normalizeEmail().isEmail(),
    check("password", "Input the password").exists()
],
 async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect input during entering the system."
            })
        }
        
        const {email, password} = req.body;
        const user = await user.findOne({email});

        if(!user) {
            return res.status(400).json({message: "Given email or password is incorrect, try again."});
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) {
            return res.status(400).json({message: "Given email or password is incorrect, try again."});
        }

        //If input data is correct generating a new jwt for user.
        const token = jwt.sign(
            { userId: user.id },
            config.get("jwtSecret"),
            { expiresIn: "1h" }
        );

        res.json({token, userId: user.id});

    } catch (e) {
        res.status(500).json({message: "The server error occured by registering a new user."})
    }
});



// Export the defined router from the current js module.
module.exports = router;