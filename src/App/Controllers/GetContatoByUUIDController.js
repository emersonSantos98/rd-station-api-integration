const GetContatoByUUIDService = require('../services/GetContatoByUUIDService')

module.exports = class CreateContatoController {
    async handle(request, response) {
        const {uuid_contato} = request.params
        const getContatoVyUUIDService = new GetContatoByUUIDService()
        const contato = await getContatoVyUUIDService.execute(uuid_contato)
        return response.json(contato)
    }
}
