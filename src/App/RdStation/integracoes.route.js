const routes = require("express").Router();
const IntegracoesController = require("./Controllers/IntegracoesContrllor");
const CreateIntegrationController = require("./Controllers/CreateIntegrationController");
const UpdatedIntegrationController = require("./Controllers/UpdatedIntegrationController");
const GetAllInteractionByIdUserController = require("./Controllers/GetAllInteractionByIdUserController");
const GetIntegrationByChatIdController = require("./Controllers/GetIntegrationByChatIdController");



routes.get("/Integracoes",  new GetAllInteractionByIdUserController().handle);
routes.get("/Integracoes/getChat",  new GetIntegrationByChatIdController().handle);
routes.get("/Integracoes/:id",  IntegracoesController.getIntegracoesById);
routes.post("/Integracoes",  new CreateIntegrationController().handle);
routes.put("/Integracoes/:id_integration",  new UpdatedIntegrationController().handle)
routes.delete("/Integracoes/:id",  IntegracoesController.deleteIntegracoes);




module.exports = routes;
