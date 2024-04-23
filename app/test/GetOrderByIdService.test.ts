const { GetOrderByIdService } = require("../src/service/order/GetOrderByIdService.js").default;
const { OrderRepository } = require("../src/repository/OrderRepository.js").default;

jest.mock("../src/repository/OrderRepository.js");

describe("GetOrderByIdService", () => {
  it("should get an order by id", async () => {
    const mockOrderId = 1;
    const mockOrder = { id: mockOrderId, status: "unfinished" };

    OrderRepository.prototype.getOrderById.mockResolvedValue(mockOrder);

    const service = new GetOrderByIdService();
    const response = await service.execute(mockOrderId);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: "Order recovered",
        statusCode: 200,
        order: mockOrder,
      }),
    });
  });
});