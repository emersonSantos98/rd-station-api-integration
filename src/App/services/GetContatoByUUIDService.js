const axios = require("axios");
const qs = require("qs");
const pool = require("../../config/database");
const ContatoRepository = require("../repositories/RdStationContatoRepository");
const {AppErrorRDStation, AppError} = require("../../error/erro");

module.exports = class GetContatoByUUIDService {
    async execute(uuid) {
        const contaoRepository = new ContatoRepository();
        const contato = await contaoRepository.getContatoByUUID(uuid)
        .catch((err) => {
            throw new AppErrorRDStation("Erro ao buscar contato", 500, err.response.data);
        });
        if (!contato) {
            throw new AppError("Contato não encontrado", 404);
        }
        return contato;
    }

}
