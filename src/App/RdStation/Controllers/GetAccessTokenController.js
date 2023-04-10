const GetAcessTokenService = require('../services/GetAcessTokenService')

module.exports = class GetAcessTokenController {
    async handle(request, response) {
        const {code, id_user } = request.query;
        const getAccessTokeService = new GetAcessTokenService()
        const result = await getAccessTokeService.execute({
            code,
            id_user
        })
        request.userRDStation = {
            ...result,
            id_user
        }
        return response.status(200).json(result)
    }
}
