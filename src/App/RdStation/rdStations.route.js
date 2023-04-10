const routesRdStation = require("express").Router();
const GetAuthUrlController = require("./Controllers/GetAUthUrlController");
const GetAccessTokenController = require("./Controllers/GetAccessTokenController");
const CreateContatoController = require("./Controllers/CreateContatoController");
const AuthMiddleware = require("../Middleware/AuthRdStation");

routesRdStation.get("/getAuthUrl", new GetAuthUrlController().handle);
routesRdStation.get("/getAccessToken", new GetAccessTokenController().handle);
routesRdStation.post("/createContato", new AuthMiddleware().handle, new CreateContatoController().handle);


module.exports = routesRdStation;
