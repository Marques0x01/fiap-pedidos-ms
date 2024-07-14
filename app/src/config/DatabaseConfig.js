const { Pool } = require('pg');

class Database {

    constructor() {
        return new Pool({
            host: "fiap-pedidos-ms.cra40kywkxpa.us-east-2.rds.amazonaws.com",
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