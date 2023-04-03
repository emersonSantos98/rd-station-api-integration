const RdStationsRepository = require('../repositories/RdStationContatoRepository');
const { AppError, AppErrorRDStation } = require('../../error/erro');
module.exports = class CreateContatoService {

    async execute({ name, email, personal_phone, city, state, country }) {
        const rdStationsRepository = new RdStationsRepository();
        const emailExist = await rdStationsRepository.getContatoByEmail(email)
        .catch((err) => {
            if(err.response.data.errors.error_message === 'The resource could not be found') {
                return false
            }
        });
        if(emailExist) {
            throw new AppError('RD Station: Email já cadastrado');
        }
        const contato = await rdStationsRepository.createContact({
            name,
            email,
            personal_phone,
            city,
            state,
            country
        })
        if(!contato) {
            throw new AppError('Erro ao criar contato');
        }

        return contato;
    };
}
