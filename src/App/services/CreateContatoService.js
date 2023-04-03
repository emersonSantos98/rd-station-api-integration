const RdStationsRepository = require('../repositories/RdStationContatoRepository');
const { AppError, AppErrorRDStation } = require('../../error/erro');
module.exports = class CreateContatoService {

    async execute({ nome, email }) {
        const rdStationsRepository = new RdStationsRepository();
        const emailExist = await rdStationsRepository.getContatoByEmail(email)
        .catch((err) => {
            throw new AppErrorRDStation(err.response.data.errors.error_message, 400, err.response.data);
        });
        if(emailExist) {
            throw new AppError('RD Station: Email já cadastrado');
        }
        const contato = await rdStationsRepository.createContact({
            nome,
            email,
        }).catch((err) => {
            throw new AppError('Erro ao criar contato');
        });
        if(!contato) {
            throw new AppError('Erro ao criar contato');
        }

        return contato;
    };
}
