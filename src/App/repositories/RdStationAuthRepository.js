const axios = require('axios');

module.exports = class RdStationContatoRepository {
    baseURL = '';
    constructor() {
        this.baseURL = 'https://api.rd.services/auth/token';
        this.token = `Bearer ${process.env.RDSTATION_TOKEN}`;
    }

    async refreshToken({ grant_type,refresh_token,client_id,client_secret }) {
       return new Promise(async (resolve, reject) => {
           await axios.post(`${this.baseURL}`, {
               grant_type,
               refresh_token,
               client_id,
               client_secret,
           }, {
               headers: {
                   Authorization: this.token,
                   'Content-Type': 'application/json',
               },
           }).then(response => {
               resolve(response.data)
           })
               .catch(error => {
                   reject(error)
               })
       })
    }
}
