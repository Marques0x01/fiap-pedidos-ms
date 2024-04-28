const { Given, When, Then } = require('cucumber');
const axios = require('axios');

const { Before, After } = require('cucumber');
const { Database } = require("../../../src/config/DatabaseConfig.js").default;

let productId;
let order;
let clientCpf;

const apiPath = "https://6wp2xidb1e.execute-api.us-east-1.amazonaws.com/prod/fiap-lanches"

Before(async function () {
    const connection = new Database();

    try {
        const select = "SELECT id FROM public.product LIMIT 1;"
        const selectClient = "SELECT id, cpf, name, email FROM public.client LIMIT 1;"

        let result = await connection.query(select, null).then(resp => resp);
        let resultClient = await connection.query(selectClient, null).then(resp => resp);

        clientCpf = resultClient.rows
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
    table.clientCpf = clientCpf[0].cpf

    console.log(table)
    return axios.post(apiPath + path, table)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Error in creating order: ' + response.statusText);
            }

            return response.data
        })
        .then(data => {
            this.order = data
        })
});

Then('the response should have status {int}', function (expectedStatus) {
    expect(this.order.statusCode).to.equal(expectedStatus);
});

Then('should return a unique order ID', function () {
    expect(this.order.orderId).to.be.a('string');
});

Then('the order should be registered with the following details:', async function (dataTable) {
    const expectedOrderData = dataTable.rowsHash();

    const select = "SELECT * FROM public.product WHERE id = ;" + this.order.orderId;
    let result = await connection.query(select, null).then(resp => resp);
    orderData = result.rows[0]

    console.log(orderData)

    // expect(orderData.cpf).to.equal(this.clientCpf[0].cpf);
    // expect(orderData.value).to.equal(expectedOrderData.value);
    // expect(orderData.status).to.equal(expectedOrderData.status);
});