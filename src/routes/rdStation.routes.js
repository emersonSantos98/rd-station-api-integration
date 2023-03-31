const rdStationController = require('../App/Controllers/rdStationController')

const router = require("express").Router();

 router.get("/getAuthorizationUrl/:id", rdStationController.getRdStation)



 module.exports = router
