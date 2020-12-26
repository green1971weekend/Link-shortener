const express = require("express");
 //Contains all configuration settings in config folder.
const config = require("config"); 
//Contains functionality for working with mongoDB.
const mongoose = require("mongoose");

//The result of express configuration. Variable app contains server functionality for starting, listening etc.
const app = express();

var cors = require('cors');

// Body parser for the correct parsing of input data to server from front-end.
var bodyParser = require('body-parser');

app.use(cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "PUT"]
}));

// Parse various different custom JSON types as JSON
// app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Another method 
// app.use(express.json({extended: true}));

//Registration of diffrent routes with use() method for request process from front-end.
app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/link", require("./routes/link.routes.js"));
app.use("/t", require("./routes/redirect.routes.js"))

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
         // Terminate the process if something went wrong.
        process.exit(1);
    }
}
start();
