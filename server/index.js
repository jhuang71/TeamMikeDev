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

app.post("/endReservation", async (req, res) => {
    try {
        const results = await pool.query(
            "UPDATE reservation SET res_end = to_timestamp($1) WHERE res_id = $2 AND student_id = $3",
            [Date.now()/1000, req.body.res_id, req.body.student_id]
        );
        console.log(results.rowCount);
        if (results.rowCount === 1) {
            res.status(201).json({
                status: "success",
                data: {
                    rows_updated: results.rowCount
                }
            });
        }
        else {
            res.status(400).json({
                status: "incompatible or invalid student and request id"
            })
        }
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});