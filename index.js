const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize, models } = require("./models/index");




async function init() {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());


    app.get("/", function (req, res) { return res.send("server running") });

    try {
        await sequelize.authenticate();
        console.log("database connected");
        await sequelize.sync({ force: true });
    }
    catch (error) {
        console.log("database not connected");
    }

    const port = 8000;
    app.listen(port, () => {
        console.log(`Server Running at http://localhost:${port}`);
    })
}
init();
