const { GetOrderByStatusService } = require("../src/service/order/GetOrderByStatusService.js").default;
const { OrderRepository } = require("../src/repository/OrderRepository.js").default;

jest.mock("../src/repository/OrderRepository.js");

describe("GetOrderByStatusService", () => {
  it("should get an order by status", async () => {
    const mockStatus = "unfinished";
    const mockOrders = [
      { id: 1, status: mockStatus },
      { id: 2, status: mockStatus },
      // Adicione mais pedidos aqui conforme necessário
    ];

    OrderRepository.prototype.getOrderByStatus.mockResolvedValue(mockOrders);

    const service = new GetOrderByStatusService();
    const response = await service.execute(mockStatus);

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: "Order recovered",
        statusCode: 200,
        order: mockOrders,
      }),
    });
  });
});