const GetAuthUrlService = require('../services/GetAuthUrlService')

module.exports = class GetAuthUrlController {
    async handle(request, response) {
        const { id_user } = request.query
        const getAuthUrlService = new GetAuthUrlService()
        const result = await getAuthUrlService.execute(id_user)
        return response.status(200).json(result)
    }
}
