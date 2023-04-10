const pool = require('../../../config/database')
const axios = require('axios')
const {AppError} = require('../../../error/erro')
module.exports = class ContatoRepository {
    constructor() {
        this.baseURL = 'https://api.rd.services/platform/contacts'
    }

    async create(rd_access_token, data) {
        return new Promise(async (resolve, reject) => {
                await axios.post(`${this.baseURL}`, {
                    ...data,
                }, {
                    headers: {
                        Authorization: `Bearer ${rd_access_token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(async (response) => {
                        await this.save({
                            ...data,
                            uuid: response.data.uuid,
                            metadata: JSON.stringify(response.data)
                        })
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error.response.data)
                    })


        })
    }

    async save({
                   name,
                   email,
                   personal_phone,
                   mobile_phone,
                   facebook,
                   linkedin,
                   state,
                   country,
                   twitter,
                   website,
                   bio,
                   job_title,
                   city,
                   uuid,
                   metadata
    }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO tb_rd_station_contatos (name, email, city, job_title, bio, website, personal_phone, twitter, country, state, linkedin, facebook, mobile_phone, uuid, metadata) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?)',
                [name, email, city, job_title, bio, website, personal_phone, twitter, country, state, linkedin, facebook, mobile_phone, uuid, metadata],
                (error, results) => {
                    if (error) {
                        console.log(error)
                        reject(error)
                    }
                    resolve(results)
                }
            )
        })
    }

    async findByEmail(email_contato) {
        console.log(email_contato)
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT * FROM tb_rd_station_contatos WHERE email = ?',
                [email_contato],
                (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(results.length > 0 ? results[0] : null)
                }
            )
        })
    }
}
