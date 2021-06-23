const Order = require("../models/order");

const { BadRequestError, ForbiddenError } = require("../utils/errors");

// Ensure auth user owner of post
const authUserOwnsPost = async (req, res, next) => {
    try {
        const { user } = req.locals;
        const { orderId } = req.params;
        const order = await Order.fetchOrderById(orderId);

        if (order.userEmail !== user.email) {
            throw new ForbiddenError(
                "user is not allowed to update other's users' order"
            );
        }

        res.locals.orders = order;

        return next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    authUserOwnsPost,
};
