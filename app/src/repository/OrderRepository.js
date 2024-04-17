const { Database } = require("../config/DatabaseConfig.js").default;
const { v4: uuidv4 } = require('uuid');
const { EOrderStatus } = require("../domain/enums/EOrderStatus.js").default;

class OrderRepository {

    async saveOrUpdate(order) {
        let TABLE = 'public."order"';
        let JOIN_TABLE = 'public."order_products_product"'

        const orderId = uuidv4();

        const connection = new Database();

        const queryOrder = `INSERT INTO ${TABLE} 
        (id, value, started_at, delivered_at, status, order_payment, "clientId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)`;

        const orderValues = [
            orderId,
            order.value,
            order.startedAt,
            order.deliveredAt,
            order.status,
            order.payment,
            order.client
        ];

        const queryJoin = `INSERT INTO ${JOIN_TABLE} 
        ("orderId", "productId")
        VALUES ($1, $2)`

        const joinValues = order.products.map(productId => [
            orderId,
            productId
        ])

        try {
            const result = await connection.query(queryOrder, orderValues);
            const resultJoin = await connection.query(queryJoin, joinValues.flat());
            console.log('Order created:', result.rows[0]);
        } catch (err) {
            console.error('Error in create order:', err.stack);
        } finally {
            await connection.end();
            return orderId;
        }
    }

    async getAllUnfinishedOrders() {
        let TABLE = 'public."order"';
        const connection = new Database();

        const queryOrder = `SELECT id, value, started_at, delivered_at, status, order_payment, "clientId"
	                        FROM ${TABLE} where status <> '${EOrderStatus.FINISHED}';`;

        let result = null
        try {
            result = await connection.query(queryOrder, null);
            console.log('Order recovered');
        } catch (err) {
            console.error('Error in getting order:', err.stack);
        } finally {
            await connection.end();
            return result.rows;
        }
    }

    async getOrderById(id) {
        let TABLE = 'public."order"';
        const connection = new Database();

        const queryOrder = `SELECT id, value, started_at, delivered_at, status, order_payment, "clientId"
	                        FROM ${TABLE} where id = '${id}';`;

        let result = null
        try {
            result = await connection.query(queryOrder, null);
            console.log('Order recovered');
        } catch (err) {
            console.error('Error in getting order:', err.stack);
        } finally {
            await connection.end();
            return result.rows;
        }
    }

    async getOrderByStatus(status) {
        let TABLE = 'public."order"';
        const connection = new Database();

        const queryOrder = `SELECT id, value, started_at, delivered_at, status, order_payment, "clientId"
	                        FROM ${TABLE} where status = '${status}';`;

        let result = null
        try {
            result = await connection.query(queryOrder, null);
            console.log('Order recovered');
            return result.rows;
        } catch (err) {
            console.error('Error in getting order:', err.stack);
        } finally {
            await connection.end();
        }
    }

    async updateOrderStatus(id, status) {
        let TABLE = 'public."order"';
        const connection = new Database();

        const queryOrder = `update ${TABLE} set status = '${status}' where id = '${id}'`;

        let result = null
        try {
            result = await connection.query(queryOrder, null);
            console.log('Order Updated');
            return result.rows;
        } catch (err) {
            console.error('Error in updating order:', err.stack);
        } finally {
            await connection.end();
        }
    }
}

exports.default = { OrderRepository }