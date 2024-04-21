const { UpdateOrderStatusService } = require("./src/service/order/UpdateOrderStatusService.js").default;
const { CreateOrderService } = require("./src/service/order/CreateOrderService.js").default;
const { GetAllUnfinishedOrdersService } = require("./src/service/order/GetAllUnfinishedOrdersService.js").default;
const { GetOrderByStatusService } = require("./src/service/order/GetOrderByStatusService.js").default;

exports.handler = async (event) => {

  let method = event.path + "-" + event.httpMethod
  switch (method) {
    case "/fiap-lanches/order-POST":
      const serviceCreate = new CreateOrderService();
      return await serviceCreate.execute(JSON.parse(event.body)).then(resp => resp);
    case "/fiap-lanches/order-GET":
      const serviceStatus = new GetOrderByStatusService();
      return await serviceStatus.execute(event.queryStringParameters.status).then(resp => resp);
    case "/fiap-lanches/order-PUT":
      const serviceUpdate = new UpdateOrderStatusService();
      return await serviceUpdate.execute(event.queryStringParameters.id, event.queryStringParameters.status).then(resp => resp);
    case "/fiap-lanches/order/unfinished-GET":
      const serviceUnfinished = new GetAllUnfinishedOrdersService();
      return await serviceUnfinished.execute().then(resp => resp);
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: (`Resource not found: ${event.path}`),
          statusCode: 404
        })
      }
  }
};