const { OrderRepository } = require("../../repository/OrderRepository.js").default;

class GetAllUnfinishedOrdersService {

    async execute() {
        await new OrderRepository().getAllUnfinishedOrders().then(resp => resp);

        return {
            statusCode: 200,
            body: JSON.stringify({
              message: (`Order updated`),
              statusCode: 200
            })
          }
    }
}

exports.default = { GetAllUnfinishedOrdersService };