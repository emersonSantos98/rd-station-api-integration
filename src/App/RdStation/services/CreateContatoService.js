const ContatiRepositoru = require('../repository/ContatoRepository');
const {AppError, AppErrorRDStation} = require("../../../error/erro");

module.exports = class CreateContatoService {
    async execute(rd_access_token, dataForm) {
        const contatoRepository = new ContatiRepositoru();
        const {email} = dataForm;
        const emailExists = await contatoRepository.findByEmail(email);
        if(emailExists) {
            throw new AppError('Email já cadastrado');
        }
        const contato = await contatoRepository.create(rd_access_token, {
            ...dataForm,
        })
            .then(response => {
                return response.data;
        })
            .catch(error => {
                throw new AppErrorRDStation(error)
            })


        return contato;
    }
}
