const rdStationController = require('../App/Controllers/rdStationController')
const CreateContatoController = require('../App/Controllers/CreateContatoController')
const router = require("express").Router();

 router.get("/getAuthorizationUrl", rdStationController.getRdStation)
 router.get("/getAccessToken", rdStationController.getAccessToken)
 router.post("/refreshAccessToken", rdStationController.refreshAccessToken)

router.post("/createContact", new CreateContatoController().handle)

 module.exports = router
