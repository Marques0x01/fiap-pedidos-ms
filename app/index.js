const { UpdateOrderStatusService } = require("./src/service/order/UpdateOrderStatusService.js").default;
const { CreateOrderService } = require("./src/service/order/CreateOrderService.js").default;
const { GetAllUnfinishedOrdersService } = require("./src/service/order/GetAllUnfinishedOrdersService.js").default;
const { GetOrderByStatusService } = require("./src/service/order/GetOrderByStatusService.js").default;


exports.handler = async (event) => {

  const method = event.path + "-" + event.httpMethod;

  try {
    let response;
    switch (method) {
      case "/fiap-lanches/order-POST":
        const serviceCreate = new CreateOrderService();
        response = await serviceCreate.execute(JSON.parse(event.body));
        break;

      case "/fiap-lanches/order-GET":
        const serviceStatus = new GetOrderByStatusService();
        response = await serviceStatus.execute(event.queryStringParameters.status);
        break;

      case "/fiap-lanches/order-PUT":
        const serviceUpdate = new UpdateOrderStatusService();
        response = await serviceUpdate.execute(event.queryStringParameters.id, event.queryStringParameters.status);
        break;

      case "/fiap-lanches/order/unfinished-GET":
        const serviceUnfinished = new GetAllUnfinishedOrdersService();
        response = await serviceUnfinished.execute();
        break;

      default:
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: `Resource not found: ${event.path}`,
            statusCode: 404
          })
        };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ resp: response })
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};
