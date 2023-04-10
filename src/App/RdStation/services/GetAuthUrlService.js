const UserAuthRepository = require('../repository/UserAuthRepository')

module.exports = class GetAuthUrl {
    async execute(id_user, state = 'RECONNECT') {
        const userAuthRepository = new UserAuthRepository()
        const userExist = await userAuthRepository.findById(id_user)
        if (!userExist) {
            state = 'FISRT_ACCESS'
            await userAuthRepository.create(id_user)
        }
        const baseURL = 'https://api.rd.services/auth/dialog'
        const params = new URLSearchParams({
            client_id: process.env.RDSTATION_CLIENT_ID,
            redirect_uri: process.env.RDSTATION_REDIRECT_URI,
            state: state,
        })
        return {
            authorizationUrl: `${baseURL}?${params.toString()}`
        }
    }
}
