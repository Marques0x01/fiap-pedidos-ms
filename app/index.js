const { UpdateOrderStatusService } = require("./src/service/order/UpdateOrderStatusService.js").default;
const { CreateOrderService } = require("./src/service/order/CreateOrderService.js").default;
const { GetAllUnfinishedOrdersService } = require("./src/service/order/GetAllUnfinishedOrdersService.js").default;
const { GetOrderByStatusService } = require("./src/service/order/GetOrderByStatusService.js").default;

const AWS = require('aws-sdk');

exports.handler = async (event) => {
  const taskToken = null;

  if (event.taskToken) {
    taskToken = event.taskToken;
  }

  let method = event.path + "-" + event.httpMethod
  switch (method) {
    case "/fiap-lanches/order-POST":
      const serviceCreate = new CreateOrderService();
      if (event.taskToken) {
        sendSfToken(taskToken);
      }
      return await serviceCreate.execute(JSON.parse(event.body)).then(resp => { 
        JSON.stringify({ token: taskToken, resp: resp }) 
      });
    case "/fiap-lanches/order-GET":
      const serviceStatus = new GetOrderByStatusService();
      if (event.taskToken) {
        sendSfToken(taskToken);
      }
      return await serviceStatus.execute(event.queryStringParameters.status).then(resp => { 
        JSON.stringify({ token: taskToken, resp: resp }) 
      });
    case "/fiap-lanches/order-PUT":
      const serviceUpdate = new UpdateOrderStatusService();
      if (event.taskToken) {
        sendSfToken(taskToken);
      }
      return await serviceUpdate.execute(event.queryStringParameters.id, event.queryStringParameters.status).then(resp => { 
        JSON.stringify({ token: taskToken, resp: resp }) 
      });
    case "/fiap-lanches/order/unfinished-GET":
      const serviceUnfinished = new GetAllUnfinishedOrdersService();
      if (event.taskToken) {
        sendSfToken(taskToken);
      }
      return await serviceUnfinished.execute().then(resp => { 
        JSON.stringify({ token: taskToken, resp: resp }) 
      });
    default:
      if (event.taskToken) {
        sendSfToken(taskToken);
      }
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: (`Resource not found: ${event.path}`),
          statusCode: 404,
          token: taskToken
        })
      }
  }
};

async function sendSfToken(taskToken) {
  const stepfunctions = new AWS.StepFunctions();
  try {
    await stepfunctions.sendTaskSuccess({
      taskToken: taskToken,
      output: JSON.stringify({ result: "Processamento concluído" })
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ token: taskToken })
    };
  } catch (error) {
    console.error(error);
  }
}