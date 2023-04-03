const axios = require('axios');

module.exports = class RdStationContatoRepository {
    baseURL = '';
    constructor() {
        this.baseURL = 'https://api.rd.services/platform/contacts';
    }

    async createContact({ email, name }) {
       return new Promise(async (resolve, reject) => {
           await axios.post(`${this.baseURL}`, {
               email,
               name,
           }, {
               headers: {
                   Authorization: `Bearer ${process.env.RDSTATION_TOKEN}`,
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

    async getContatoByEmail(email) {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${this.baseURL}/email:${email}`, {
                headers: {
                    Authorization: `Bearer ${process.env.RDSTATION_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}
