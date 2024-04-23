const { CreateOrderService } = require("../src/service/order/CreateOrderService").default;
const { ClientHttp } = require("../src/http/ClientHttp.js").default;
const { ProductHttp } = require("../src/http/ProductHttp.js").default;
const { OrderRepository } = require("../src/repository/OrderRepository.js").default;


jest.mock("../src/http/ClientHttp.js");
jest.mock("../src/http/ProductHttp.js");
jest.mock("../src/repository/OrderRepository.js");

describe("CreateOrderService", () => {
  it("should create an order", async () => {
    const mockOrder = {
      clientCpf: "123.456.789-00",
      value: 100,
      productsIds: [1, 2, 3],
    };

    const mockClient = { id: 1 };
    const mockProducts = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const mockOrderId = "order123";

    ClientHttp.prototype.getClient.mockResolvedValue(mockClient);
    ProductHttp.prototype.getProducts.mockResolvedValue(mockProducts);
    OrderRepository.prototype.saveOrUpdate.mockResolvedValue(mockOrderId);

    const service = new CreateOrderService();
    const response = await service.execute(mockOrder);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: `Order created: ${mockOrderId}`,
        statusCode: 200,
        orderId: mockOrderId,
      }),
    });
  });
});
