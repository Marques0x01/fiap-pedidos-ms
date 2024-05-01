const { Given, When, Then } = require('cucumber');
const axios = require('axios');

const { Before, After } = require('cucumber');
const { Database } = require("../../../src/config/DatabaseConfig.js").default;

const { expect } = require('chai');
let productId;
let order;
let clientCpf;

const apiPath = "https://s7gj6mrxe0.execute-api.us-east-1.amazonaws.com/prod/fiap-lanches"

Before(async function () {

    try {
        let path = 'http://fiap-elb-1037109563.us-east-1.elb.amazonaws.com:3000/api/v1/product?category=Main%20Dish'

        let data = await axios.get(path)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Error in getting product: ' + response.statusText);
                }
                return response.data;
            })
            .then(data => {
                return data
            });

        this.productId = data.products[0].id;


        let pathClient = 'http://fiap-elb-1037109563.us-east-1.elb.amazonaws.com:3000/api/v1/client'

        let dataClient = await axios.get(pathClient)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('Error in getting product: ' + response.statusText);
                }
                return response.data;
            })
            .then(data => {
                return data
            });

        this.clientCpf = dataClient[0].cpf;
    } catch (err) {
        console.error('Error in getting product:', err.stack);
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

    let table = dataTable.rowsHash()
    table.productsIds = [this.productId]
    table.clientCpf = Number(this.clientCpf)

    await axios.post(apiPath + path, table)
        .then(response => {
            if (response.status !== 201) {
                throw new Error('Error in creating order: ' + response.statusText);
            }


            return response.data
        })
        .then(data => {
            this.order = data
        }).catch(err => {
            console.log(err)
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

    const connection = new Database();

    const select = "SELECT * FROM public.order WHERE id = '" + this.order.orderId + "'";

    let result = await connection.query(select, null).then(resp => resp);

    orderData = result.rows[0]

    expect(orderData.status).to.equal(expectedOrderData.status);
    expect(orderData.order_payment).to.equal(expectedOrderData.order_payment);
});


Then('the order should be registered with a client', async function () {
    const connection = new Database();

    const select = "SELECT * FROM public.order WHERE id = '" + this.order.orderId + "'";

    let result = await connection.query(select, null).then(resp => resp);

    orderData = result.rows[0]

    expect(orderData.clientId).not.to.be.null;
});


Then('the order should be registered in table with produts', async function () {
    const connection = new Database();

    const selectJoinTable = "SELECT * FROM public.order_products_product WHERE \"orderId\" = '" + this.order.orderId + "'";

    let resultJoin = await connection.query(selectJoinTable, null).then(resp => resp);
    orderJoinData = resultJoin.rows[0]

    expect(orderJoinData).not.to.be.null;
});
