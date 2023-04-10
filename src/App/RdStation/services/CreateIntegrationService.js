const IntegrationRepository = require('../repository/IntegrationRDStationRepository');
const {generateUUID} = require('../../Utils/generatorUUID')
module.exports = class CreateIntegrationService {
    async execute({ modelo, fluxos, eventos, id_user, id_chat, modelo_metadata }) {
        const integratioRepository = new IntegrationRepository()
        console.log(modelo, fluxos, eventos, id_user, id_chat, modelo_metadata)
        const { insertId } = await integratioRepository.create({
            modelo,
            indetificador: generateUUID(),
            fluxos,
            eventos,
            id_user,
            id_chat,
            modelo_metadata })
        return await integratioRepository.findById(insertId)
    }
}
