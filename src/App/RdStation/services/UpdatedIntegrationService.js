const IntegrationRepository = require('../repository/IntegrationRDStationRepository');
const {AppError} = require('../../../error/erro');
module.exports = class UpdatedIntegrationService {

    async execute(id_integration, { modelo, fluxos, eventos, id_user, id_chat, modelo_metadata }) {
        const integrationRepository = new IntegrationRepository();
        const integration = await integrationRepository.findById(id_integration);

        if (!integration) {
            throw new AppError('Integração não encontrada', 404);
        }
        await integrationRepository.update(id_integration, {
            modelo,
            fluxos,
            eventos,
            id_user,
            id_chat,
            modelo_metadata
        })

        return await integrationRepository.findById(id_integration);
    }
}
