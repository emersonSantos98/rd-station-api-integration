
const rdStationRouter = require('./rdStation.routes')
const router = require("express").Router();



router.use('/', rdStationRouter);

module.exports = router



