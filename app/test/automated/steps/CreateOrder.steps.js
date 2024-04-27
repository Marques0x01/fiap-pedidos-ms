const { Given, When, Then } = require('cucumber');
const axios = require('axios');

const { Before, After } = require('cucumber');
const { Database } = require("../../../src/config/DatabaseConfig.js").default;

let productId;
let order;

const apiPath = "https://6wp2xidb1e.execute-api.us-east-1.amazonaws.com/prod/fiap-lanches"

Before(async function () {
    const connection = new Database();
    
    try {
        const select = "SELECT id FROM public.product LIMIT 1;"
        let result = await connection.query(select, null).then(resp => resp);
        productId = result.rows
    } catch (err) {
        console.error('Error in getting product:', err.stack);
    } finally {
        await connection.end();
    }
});

After(async function () {
    // try {
    //     const connection = new Database();

    //     const select = "SELECT id FROM public.product LIMIT 1;"
    //     let result = await connection.query(select, null).then(resp => resp);
    //     productId = result.rows
    // } catch (err) {
    //     console.error('Error in getting product:', err.stack);
    // } finally {
    //     await connection.end();
    // }
});


When('I send a POST request to {string} with the following details with a random product ID:', async function (path, dataTable) {
    const table = dataTable.rowsHash()
    table.productsIds = [productId[0].id]

    console.log(table)
    return axios.post(apiPath + path, table)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Error in creating order: ' + response.statusText);
            }
            console.log(response)
        })
        .then(data => {
            // console.log('Product recovered:', id);
            // products.push(data.id); //
        });
});

Then('the response should have status {int}', function (expectedStatus) {
    // Implementação dos passos para verificar o status da resposta
    // expect(response.status).to.equal(expectedStatus);
});

Then('should return a unique order ID', function () {
    // Implementação dos passos para verificar se um ID de pedido único foi retornado
    // expect(orderId).to.be.a('string');
});

Then('the order should be registered with the following details:', async function (dataTable) {
    // const expectedOrderData = dataTable.rowsHash();

    console.log(dataTable)
    // // Lógica para recuperar os detalhes do pedido com base no orderId
    // const response = await axios.get(`/orders/${orderId}`);
    // const orderData = response.data;

    // // Implementação dos passos para verificar os detalhes do pedido
    // expect(orderData.clientId).to.equal(expectedOrderData.clientId);
    // expect(orderData.value).to.equal(expectedOrderData.value);
    // expect(orderData.status).to.equal(expectedOrderData.status);
});