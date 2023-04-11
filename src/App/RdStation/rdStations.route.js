const routesRdStation = require("express").Router();
const GetAuthUrlController = require("./Controllers/GetAUthUrlController");
const GetAccessTokenController = require("./Controllers/GetAccessTokenController");
const CreateContatoController = require("./Controllers/CreateContatoController");

routesRdStation.get("/getAuthUrl", new GetAuthUrlController().handle);
routesRdStation.get("/getAccessToken", new GetAccessTokenController().handle);
routesRdStation.post("/createContato", new CreateContatoController().handle);


module.exports = routesRdStation;
