const { GetAllUnfinishedOrdersService } = require("../src/service/order/GetAllUnfinishedOrdersService.js").default;
const { OrderRepository } = require("../src/repository/OrderRepository.js").default;

jest.mock("../src/repository/OrderRepository.js");

describe("GetAllUnfinishedOrdersService", () => {
  it("should get all unfinished orders", async () => {
    const mockOrders = [
      { id: 1, status: "unfinished" },
      { id: 2, status: "unfinished" },
      // Adicione mais pedidos aqui conforme necessário
    ];

    OrderRepository.prototype.getAllUnfinishedOrders.mockResolvedValue(mockOrders);

    const service = new GetAllUnfinishedOrdersService();
    const response = await service.execute();

    expect(response).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: "Orders recovered",
        statusCode: 200,
        orders: mockOrders,
      }),
    });
  });
});