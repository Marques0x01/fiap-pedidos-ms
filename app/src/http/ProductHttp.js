const axios = require('axios');

class ProductHttp {

    async getProducts(productIds) {
        let products = []

        const requests = productIds.map(id => {
            let path = 'http://ab3f859bf9c494838a5a78af24f9e112-566979247.us-east-1.elb.amazonaws.com/api/v1/product/' + id

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
