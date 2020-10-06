const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "password", //TODO correct this field
    host: "localhost",
    port: 5432,
    database: "iitStudySpaces" //TODO correct this field
});

module.exports = pool;