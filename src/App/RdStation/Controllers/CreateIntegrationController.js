const CreateIntegrationService = require('../services/CreateIntegrationService');

module.exports = class CreateIntegrationController {

  async handle(request, response) {
    const { modelo, fluxos, eventos, id_user, id_chat, modelo_metadata  } = request.body;
   const createIntegrationService = new CreateIntegrationService();
      const results = await createIntegrationService.execute({
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
