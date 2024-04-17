const { OrderRepository } = require("../../repository/OrderRepository.js").default;

class GetOrderByStatusService  {

  async execute(status) {
    const result = await new OrderRepository().getOrderByStatus(status).then(resp => resp);

    return {
        statusCode: 200,
        body: JSON.stringify({
          message: (`Order recovered`),
          statusCode: 200,
          order: result
        })
      }
  }
}

exports.default = { GetOrderByStatusService }