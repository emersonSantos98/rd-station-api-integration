const rdStationController = require('../App/Controllers/rdStationController')

const router = require("express").Router();

 router.get("/getAuthorizationUrl", rdStationController.getRdStation)
 router.get("/getAccessToken", rdStationController.getAccessToken)
 router.post("/refreshAccessToken", rdStationController.refreshAccessToken)



 module.exports = router
