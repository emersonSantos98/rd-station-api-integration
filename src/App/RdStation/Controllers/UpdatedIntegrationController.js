const UpdatedIntegrationService = require('../services/UpdatedIntegrationService');

module.exports = class CreateIntegrationController {

    async handle(request, response) {
        const { id_integration } = request.params;
        const { modelo, fluxos, eventos, id_user, id_chat, modelo_metadata  } = request.body;
        const updateIntegrationSerice = new UpdatedIntegrationService();
        const results = await updateIntegrationSerice.execute(id_integration, {
            modelo,
            fluxos,
            eventos,
            id_user,
            id_chat,
            modelo_metadata
        });

        return response.status(201).json(results);

    }
}
