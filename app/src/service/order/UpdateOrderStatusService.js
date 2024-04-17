const { OrderRepository } = require("../../repository/OrderRepository.js").default;

class UpdateOrderStatusService {

    async execute(id, status) {
        const result = await new OrderRepository().updateOrderStatus(id, status).then(resp => resp);

        return {
            statusCode: 200,
            body: JSON.stringify({
              message: (`Order recovered`),
              statusCode: 200,
              orders: result
            })
          }
    }
}

exports.default = { UpdateOrderStatusService };