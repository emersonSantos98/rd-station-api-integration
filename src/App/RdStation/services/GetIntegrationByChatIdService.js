const IntegrationRepository = require('../repository/IntegrationRDStationRepository');
const {AppError, AppErrorRDStation} = require("../../../error/erro");

module.exports = class CreateContatoService {
    async execute(id_chat) {
        const integrationRepository = new IntegrationRepository();
        const integrationExists = await integrationRepository.findIntegrationsByIdChat(id_chat);
        if (!integrationExists) {
            throw new AppError("Integração não encontrada", 404);
        }
        return integrationExists;
    }
}
