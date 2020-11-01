const express = require("express");
const config = require("config");   //Keeps all configuration settings in config folder
const mongoose = require("mongoose");

const app = express();

//  In the production and development modes we'll have the diffrent port values.
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
