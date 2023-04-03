const CreateContatoService = require('../services/CreateContatoService')

module.exports = class CreateContatoController {
    async handle(request, response) {
        const {name, email, personal_phone, city, state, country} = request.body
        const createContatoService = new CreateContatoService()
        const contato = await createContatoService.execute({
            name,
            email,
            personal_phone,
            city,
            state,
            country
        })
        return response.json(contato)

    }
}
