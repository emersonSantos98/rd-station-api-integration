const axios = require('axios');

module.exports = class RdStationContatoRepository {
    baseURL = '';

    constructor() {
        this.baseURL = 'https://api.rd.services/platform/contacts';
    }

    async getContatoByUUID(uuid) {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${this.baseURL}/${uuid}`)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    async createContact({name, email, personal_phone, city, state, country}) {
        return new Promise(async (resolve, reject) => {
            await axios.post(`${this.baseURL}`, {
                name,
                email,
                personal_phone,
                city,
                state,
                country
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
