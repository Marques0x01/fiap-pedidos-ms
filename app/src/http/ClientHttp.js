const axios = require('axios');

class ClientHttp {

    async getClient(clientId) {
        let path = 'http://fiap-elb-1037109563.us-east-1.elb.amazonaws.com:3000/api/v1/client/' + clientId

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
