const { OrderRepository } = require("../../repository/OrderRepository.js").default;

class GetAllUnfinishedOrdersService {

    async execute() {
        const result = await new OrderRepository().getAllUnfinishedOrders().then(resp => resp);

        return {
            statusCode: 200,
            body: JSON.stringify({
              message: (`Orders recovered`),
              statusCode: 200,
              orders: result
            })
          }
    }
}

exports.default = { GetAllUnfinishedOrdersService };