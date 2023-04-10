const pool = require("../../../config/database");

const getIntegracoes = async (request, response) => {
        pool.query('SELECT * FROM tb_rd_integracoes ORDER BY id ASC', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results);
        });
};

const getIntegracoesById = async (request, response) => {
    const id = request.params.id;
    pool.query(`SELECT * FROM tb_rd_integracoes WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}

const updateIntegracoes = async (request, response) => {
  const id = request.params.id;

  const	{
    modelo,
    indetificador,
    fluxos,
    eventos,
    criado_em,
    id_user,
    id_chat,
    modelo_metadata,
  } = request.body;

  pool.query(`UPDATE tb_rd_integracoes SET modelo = '${modelo}', indetificador = '${indetificador}', fluxos = '${fluxos}', eventos = '${eventos}', criado_em = '${criado_em}', id_user = '${id_user}', id_chat = '${id_chat}', modelo_metadata = '${modelo_metadata}' WHERE id = ${id}`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Integração modificada com ID: ${id}`)
  });

}

const deleteIntegracoes = async (request, response) => {
  const id = request.params.id;

  pool.query(`DELETE FROM tb_rd_integracoes WHERE id = ${id}`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Integração deletada com ID: ${id}`)
  });
}

module.exports = {
  getIntegracoes,
  getIntegracoesById,
  updateIntegracoes,
  deleteIntegracoes
};


