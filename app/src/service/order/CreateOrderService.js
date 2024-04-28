const { ClientHttp } = require("../../http/ClientHttp.js").default;
const { ProductHttp } = require("../../http/ProductHttp.js").default;
const { EOrderStatus } = require("../../domain/enums/EOrderStatus.js").default;
const { EOrderPayment } = require("../../domain/enums/EPayment.js").default
const { OrderRepository } = require("../../repository/OrderRepository.js").default;

class CreateOrderService {

  async execute(order) {
    const clientHttp = new ClientHttp();
    const product = new ProductHttp();
    const repository = new OrderRepository();

    console.log(order)

    const client = order.clientCpf ? await clientHttp.getClient(order.clientCpf).then(resp => resp) : null

    const order_created = {
      value: order.value,
      products: await product.getProducts(order.productsIds),
      startedAt: new Date(),
      deliveredAt: null,
      payment: EOrderPayment.WAITING,
      status: EOrderStatus.RECEIVED,
      client: client ? client.id : null
    }

    const orderId = await repository.saveOrUpdate(order_created).then(resp => resp);
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: (`Order created: ${orderId}`),
        statusCode: 201,
        orderId: orderId
      })
    }
  }
}

exports.default = { CreateOrderService }