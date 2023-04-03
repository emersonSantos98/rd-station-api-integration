const CreateContatoService = require('../services/CreateContatoService')

module.exports = class CreateContatoController {
    async handle(request, response) {
        const {name, email} = request.body
        const createContatoService = new CreateContatoService()
        const contato = await createContatoService.execute({
            name,
            email
        })
        return response.json(contato)

    }
}
