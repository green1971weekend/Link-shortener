const express = require("express");
const config = require("config");   //Contains all configuration settings in config folder.
const mongoose = require("mongoose"); //Contains functionality for working with mongoDB.

//The result of express configuration. Variable app contains server functionality for starting, listening etc.
const app = express();

var cors = require('cors');

// Body parser for the correct parsing of input data to server from front-end.
var bodyParser = require('body-parser');

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"]
}));

// Parse various different custom JSON types as JSON
// app.use(bodyParser.json({ type: 'application/*+json' }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Registration of diffrent routes with use() for processing requests from front-end.
app.use("/api/auth", require("./routes/auth.routes"));

//In the production and development modes we'll have the diffrent port values.
const PORT = config.get("port") || 5000;


async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            //Use parameters is necessary for successful connection to mongoDB.
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`Application has been started on port ${PORT}...`);
        });

    } catch(e) {
        console.log("Server error", e.message);
        process.exit(1); // Terminate the process if something went wrong.
    }
}
start();
