const UserAuthRepository = require('../repository/UserAuthRepository')
const {AppError} = require('../../../error/erro')
const axios = require('axios')
const {URLSearchParams} = require('url')

module.exports = class RefreshTokenService {
    async execute(refresh_token, id_user) {
        return new Promise(async (resolve, reject) => {
            const userAuthRepository = new UserAuthRepository()
            const baseURL = 'https://api.rd.services/auth/token'
            const data = new URLSearchParams({
                refresh_token: refresh_token,
                client_id: process.env.RDSTATION_CLIENT_ID,
                client_secret: process.env.RDSTATION_CLIENT_SECRET,
            })

            await axios.post(baseURL, data)
                .then(async (response) => {
                    const {access_token, refresh_token, expires_in} = response.data
                    await userAuthRepository.updateRefreshToken(id_user, {
                        access_token,
                        refresh_token,
                        expires_in
                    })
                    resolve({
                        access_token,
                        refresh_token,
                        expires_in
                    })
                })
                .catch((error) => {
                    reject(error.response.data)
                })
        })
    }
}
