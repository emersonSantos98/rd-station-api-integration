const rdStationController = require('../App/Controllers/rdStationController')
const AuthRdStation = require('../Middleware/AuthRdStation')
const CreateContatoController = require('../App/Controllers/CreateContatoController')
const GetContatoByUUIDController = require('../App/Controllers/GetContatoByUUIDController')
const router = require("express").Router();

 router.get("/getAuthorizationUrl", rdStationController.getRdStation)
 router.get("/getAccessToken", new AuthRdStation().handle, rdStationController.getAccessToken)
 router.post("/refreshAccessToken", new AuthRdStation().handle, rdStationController.refreshAccessToken)

router.post("/createContact", new AuthRdStation().handle, new CreateContatoController().handle)
router.get("/contatos/:uuid_contato", new AuthRdStation().handle, new GetContatoByUUIDController().handle)
 module.exports = router

