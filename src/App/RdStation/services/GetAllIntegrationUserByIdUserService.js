const IntegrationRDStationRepository = require('../repository/IntegrationRDStationRepository')

module.exports = class GetAllInteractionByIdUserService {
    async execute(id_user) {
        const integrationRDStationRepository = new IntegrationRDStationRepository()
        const integrations = await integrationRDStationRepository.getAllIntegrationByIdUser(id_user)
        return integrations
    }
}
