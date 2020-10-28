const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

//ROUTES
//Test buttons
app.post("/addBuilding", async (req, res) => {
    try {
        const buildingQuery = await pool.query(
            "INSERT INTO building(building_name) VALUES ($1)", ["Hermann Hall"]
        );
        console.log("adding building");
        res.json(buildingQuery);
    } catch (error) {
        console.error(error.message);
    }
});
app.post("/addSpace", async (req, res) => {
    try {
        const spaceQuery = await pool.query(
            "INSERT INTO study_space(building_id, enclosed, num_chairs, space_loc, picture_link) VALUES ($1, $2, $3, $4, $5)", [1, "TRUE", 4, "Hermann Hall", "N/A"]
        );
        console.log("adding space");
        res.json(spaceQuery);
    } catch (error) {
        console.error(error.message);
    }
});
app.post("/addUser", async (req, res) => {
    try {
        const userQuery = await pool.query(
            "INSERT INTO users(privilege_type, user_name, user_email, password_hash) VALUES ($1, $2, $3, $4)", ["student", "admin", "admin@testing.com", "lol"]
        );
        console.log("adding user");
        res.json(userQuery);
    } catch (error) {
        console.error(error.message);
    }
});


//create a reservation
app.post("/reservation", async (req, res) => {
    try {
        const results = await pool.query(
            "INSERT INTO reservation (student_id, space_id, res_start, res_end) VALUES($1, $2, $3, $4) RETURNING *",
            [req.body.student_id, req.body.space_id, req.body.res_start, req.body.res_end]
        );
        console.log(req.body);
        res.status(201).json({
            status: "success",
            data: {
                reservation: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err.message);
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