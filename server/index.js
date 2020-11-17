const express = require("express");
const cors = require("cors");
const pool = require("./db");
const { Connection } = require("pg");
const { response } = require("express");
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

//building page
app.get("/spaces/:id", async (req, res) => {
    try {
        const now = Date.now();

        const { id } = req.params;
        const spaces = await pool.query("SELECT space_id FROM study_space WHERE building_id = $1", [id]);
        
        const availability = [];
        for (i = 0; i < spaces.rowCount; i++) {
            const response = await pool.query(
                "SELECT res_start, res_end FROM reservation WHERE space_id = $1 AND res_end > to_timestamp($2)",
                [spaces.rows[i].space_id, now / 1000]
            )

            let result = {
                space_id: spaces.rows[i].space_id,
                available: true,
            }

            if (response.rowCount > 0) {
                result.time = response.rows[0].res_start;
            }
            else {
                result.time = now;
            }

            for (j = 0; j < response.rowCount; j++) {
                if (response.rows[j].res_start < now) {
                    result.available = false;
                    result.time = response.rows[j].res_end;
                    break;
                }
                else if (response.rows[j].res_start < result.time) {
                    result.time = response.rows[j].res_start;
                }
            }

            if (result.available) {
                if (result.time == now) {
                    result.text = "Available"
                }
                else if (result.time < now + (2 * 60 * 60 * 1000)) {
                    result.text = "Available until " + new Date(result.time).getHours() + ":" + new Date(result.time).getMinutes();
                }
                else {
                    result.text = "Available"
                }
            }
            else {
                if (result.time < now + (2 * 60 * 60 * 1000)) {
                    result.text = "Unavailable until " + new Date(result.time).getHours() + ":" + new Date(result.time).getMinutes();
                }
                else {
                    result.text = "Unavailable";
                }
            }

            availability.push(result);
        }

        res.status(201).json(availability);
    } catch (error) {
        console.error(error.message);
    }
});

app.post("/addGoogle", async (req, res) => {
    try {
        const googleQuery = await pool.query(
            "INSERT INTO users(user_id, privilege_type, user_name, user_email) VALUES ($1, $2, $3, $4)", 
            [req.body.user_id, 'student', req.body.user_name, req.body.user_email]
        );
        console.log(req.body);
        res.json(googleQuery);
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

//delete a reservation using res_id
app.delete("/reservation/:id", async(req, res) => {
    try {
      const {id} = req.params;
      const deleteTodo = await pool.query(
        "DELETE FROM reservation WHERE res_id = $1", [id]);
      
      res.json("ID '" + id + "' deleted!");
    } catch (err) {
      console.error(err.message);
    }
  })

//get a reservation using res_id
app.get("/reservation/:id", async(req, res) => {
    try {
      const {id} = req.params;
      const reservation = await pool.query(
        "SELECT * FROM reservation WHERE res_id = $1", [id]);
      
      res.json(reservation.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  })

//get reservations using student_id
app.get("/reservations/:studentId", async(req, res) => {
    try {
      const {studentId} = req.params;
      const reservation = await pool.query(
        "SELECT * FROM reservation WHERE student_id = $1 ORDER BY res_start", [studentId]);
      
      res.json(reservation.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

//get all reservations
app.get("/reservations", async(req, res) => {
    try {
      const allReservations = await pool.query(
        "SELECT * FROM reservation");
      
      res.json(allReservations.rows);
  
    } catch (err) {
      console.error(err.message);
    }
  })

// get study spaces given building id
app.get("/get/study_spaces/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const spaces = await pool.query("SELECT * FROM study_space WHERE building_id = $1", [id]);
        res.json(spaces.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// get user from data
app.get("/get/user/:googleId", async (req, res) => {
    try {
        const { googleId } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [googleId]);
        res.json(user.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
});