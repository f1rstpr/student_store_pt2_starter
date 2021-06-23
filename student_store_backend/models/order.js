const db = require("../db");
const { NotFoundError } = require("../utils/errors");

class Order {
    static async listOrders() {
        const results = await db.query(`
            SELECT
                o.id,
                u.email
            FROM orders AS o

                JOIN users AS u ON u.id = o.customer_id

        `);
        return results.rows;
    }

    static async createOrder({ order, user }) {
        const results = await db.query(
            `
            INSERT INTO orders (customer_id)
            VALUES (
                (SELECT id FROM users WHERE email = $1))
            RETURNING id
            `,
            [user.email]
        );
        return results.rows[0];
    }

    static async fetchOrderById(orderId) {
        const results = await db.query(
            `
            SELECT
                o.id,
                u.email
            FROM orders AS o

                JOIN users AS u ON u.id = o.customer_id
            WHERE o.id = $1
        `,
            [orderId]
        );
        const order = results.rows[0];

        if (!order) {
            throw new NotFoundError();
        }
        return order;
    }
}

module.exports = Order;
