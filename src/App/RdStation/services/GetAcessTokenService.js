const UserAuthRepository = require('../repository/UserAuthRepository')
const {AppError} = require('../../../error/erro')
const axios = require('axios')
const { URLSearchParams } = require('url')

module.exports = class GetAuthUrl {
    async execute({ id_user, code }) {
        const userAuthRepository = new UserAuthRepository()
        const userExist = await userAuthRepository.findById(id_user)
        if (!userExist) {
            throw new AppError('Usuario não encontrado', 404)
        }
        const expiresDate = new Date(Date.parse(userExist.date_expires_in));
        const now = new Date();
        if (expiresDate > now) {
            return {
                access_token: userExist.access_token,
                refresh_token: userExist.refresh_token,
                code: userExist.code,
                expiresIn: userExist.expires_in
            }
        }

        const baseURL = 'https://api.rd.services/auth/token'
        const data = new URLSearchParams({
            client_id: process.env.RDSTATION_CLIENT_ID,
            client_secret: process.env.RDSTATION_CLIENT_SECRET,
            code: code,
        })
        let dataResponse = {}
        await axios.post(baseURL, data)
            .then(async (response) => {
                const { access_token, refresh_token, expires_in } = response.data
                await userAuthRepository.update(id_user, {
                    access_token,
                    refresh_token,
                    expires_in,
                    code
                })

                dataResponse =  {
                    access_token,
                    refresh_token,
                    code,
                    expiresIn: expires_in,
                }
            })
            .catch((error) => {
                throw new AppError(error, 400)
            })

        return dataResponse
    }
}
