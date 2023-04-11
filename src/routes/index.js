
const rdStationRouter = require('./rdStation.routes')
const router = require("express").Router();
const routeRDStaion = require('../App/RdStation/rdStations.route')


router.use('/', rdStationRouter);
router.use('/rdStation', routeRDStaion);

module.exports = router



