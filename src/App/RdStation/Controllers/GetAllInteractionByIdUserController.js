const GetAllIntegrationUserByIdUserService = require('../services/GetAllIntegrationUserByIdUserService')

module.exports = class GetAllIntegrationUserByIdUserController {
    async handle(request, response) {
        const { id_user } = request.query
        const getAllIntegrationUserByIdUserService = new GetAllIntegrationUserByIdUserService()
        const result = await getAllIntegrationUserByIdUserService.execute(id_user)
        return response.status(200).json(result)
    }
}
