require('dotenv').config();
const App = require("./src/app").server


const port = process.env.PORT;




App.get('/', function (req, res) {
    res.send('Api rodando com sucesso!');
});



App.listen(port, (err) => {
    if (err) console.log("Erro na configuração do servidor")
    console.log(`Aplicativo rodando na porta ${port}.`);
})
