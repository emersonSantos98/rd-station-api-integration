const GetIntegrationByChatIdService = require('../services/GetIntegrationByChatIdService')

module.exports = class GetIntegrationByChatIdController {
    async handle(request, response) {
        const { id_chat } = request.query
        const getIntegrationByChatId = new GetIntegrationByChatIdService()
        const result = await getIntegrationByChatId.execute(id_chat)
        return response.status(200).json(result)
    }
}
