const { Pool } = require('pg');

class Database {

    constructor() {
        return new Pool({
            host: "totem-pedidos.cr2606cgcfa7.us-east-2.rds.amazonaws.com",
            user: "postgres",
            password: "secretpassword",
            database: "postgres",
            port: 5432,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
}

exports.default = { Database }