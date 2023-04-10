const CreateContatoService = require('../services/CreateContatoService');
const UserAuthRepository = require('../repository/UserAuthRepository');

module.exports = class CreateContatoController {
    async handle(request, response) {
        const {id_user} = request.query;

        const createContatoService = new CreateContatoService();
        const userRepository = new UserAuthRepository();
        const user = await userRepository.findById(id_user);
        const contato = await createContatoService.execute(user.access_token, {
            ...request.body,
        });

        return response.json(contato);
    }
};
