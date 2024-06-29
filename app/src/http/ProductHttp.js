const axios = require('axios');

class ProductHttp {

    async getProducts(productIds) {
        let products = []

        const requests = productIds.map(id => {
            let path = 'http://fiap-elb-433654547.us-east-2.elb.amazonaws.com:3000/api/v1/product/' + id

            return axios.get(path)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('Error in getting product: ' + response.statusText);
                    }
                    return response.data.product;
                })
                .then(data => {
                    console.log('Product recovered:', id);
                    products.push(data.id); // Usamos push() em vez de append() para adicionar itens ao array
                });
        })

        await Promise.all(requests);
        return products;
    }
}

exports.default = { ProductHttp };
