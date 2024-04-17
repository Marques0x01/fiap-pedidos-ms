const axios = require('axios');

class ClientHttp {

    async getClient(clientId) {
        let path = 'http://ab3f859bf9c494838a5a78af24f9e112-566979247.us-east-1.elb.amazonaws.com/api/v1/client/' + clientId
        return await axios.get(path)
            .then(response => {
                if (response.status != 200) {
                    throw new Error('Error in getting client: ' + response.statusText);
                }
                return response.data;
            })
            .then(data => {
                console.log('Client recovered:', clientId);
                return data;
                
            })
            .catch(error => {
                throw new Error('Error in getting client: ' + error);
            });
    }
}

exports.default = { ClientHttp };
