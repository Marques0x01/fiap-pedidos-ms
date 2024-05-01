const { Pool } = require('pg');

class Database {

    constructor() {
        return new Pool({
            host: "fiap-pedidos-ms.cfooekoy8k6i.us-east-1.rds.amazonaws.com",
            user: "postgres",
            password: "mysecretpassword",
            database: "postgres",
            port: 5432,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }
}

exports.default = { Database }