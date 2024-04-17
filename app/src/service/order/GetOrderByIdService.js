const { OrderRepository } = require("../../repository/OrderRepository.js").default;

class GetOrderByIdService  {

  async execute(id) {
    const result = await new OrderRepository().getOrderById().then(resp => resp);

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

exports.default = { GetOrderByIdService };
