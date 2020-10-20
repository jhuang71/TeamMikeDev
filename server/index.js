const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

//TODO write API
app.post("/test", async (req, res) => {
    try {
        const testQuery = await pool.query(
            "INSERT INTO building(building_name) VALUES ($1)", ["Hermann Hall"]
        );

        res.json(testQuery);
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});