const { UpdateOrderStatusService } = require("../src/service/order/UpdateOrderStatusService.js").default;
const { OrderRepository } = require("../src/repository/OrderRepository.js").default;

jest.mock("../src/repository/OrderRepository.js");

describe("UpdateOrderStatusService", () => {
  it("should update an order status", async () => {
    const mockOrderId = 1;
    const mockStatus = "finished";
    const mockOrder = { id: mockOrderId, status: mockStatus };

    OrderRepository.prototype.updateOrderStatus.mockResolvedValue(mockOrder);

    const service = new UpdateOrderStatusService();
    const response = await service.execute(mockOrderId, mockStatus);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: "Order updated",
        statusCode: 200,
        orders: mockOrder,
        id: mockOrderId,
        status: mockStatus,
      }),
    });
  });
});