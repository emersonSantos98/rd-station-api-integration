const rdStationController = require('../App/Controllers/rdStationController')
const CreateContatoController = require('../App/Controllers/CreateContatoController')
const router = require("express").Router();
const  rdStationTokenRenewal  = require('../middleware/refreshTokenMiddleware')

 router.get("/getAuthorizationUrl", rdStationController.getRdStation)
 router.get("/getAccessToken", rdStationController.getAccessToken)
 router.post("/refreshAccessToken", rdStationController.refreshAccessToken)

router.post("/createContact", rdStationTokenRenewal, new CreateContatoController().handle)

 module.exports = router
