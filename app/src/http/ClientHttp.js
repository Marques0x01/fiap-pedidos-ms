const axios = require('axios');

class ClientHttp {

    async getClient(clientId) {
        let path = 'http://fiap-elb-246122670.us-east-2.elb.amazonaws.com:3000/api/v1/client/' + clientId

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
