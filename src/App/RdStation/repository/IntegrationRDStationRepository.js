const pool = require('../../../config/database');

module.exports = class IntegrationRDStationRepository {

    async create({ modelo, indetificador, fluxos, eventos, id_user, id_chat, modelo_metadata }) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO tb_rd_integracoes
                            (modelo, indetificador, fluxos, eventos, criado_em, id_user, id_chat, modelo_metadata)
                        VALUES
                            (?, ?, ?, ?, DATE_SUB(NOW(), INTERVAL 3 HOUR), ?, ?, ?)`,
                [modelo, indetificador, fluxos, eventos, id_user, id_chat, modelo_metadata],(error, results) => {

                if (error) {
                    return reject(error);
                }
                resolve(results)
            });
        })
    }

    async findById(id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM tb_rd_integracoes WHERE id = ?`, [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0])
            });
        })
    }

    async getAllIntegrationByIdUser(id_user) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM tb_rd_integracoes WHERE id_user = ?`, [id_user], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results)
            });
        })
    }

    async findIntegrationsByIdChat(id_chat) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM tb_rd_integracoes WHERE id_chat = ?`, [id_chat], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results)
            });
        })
    }

    async update(id_integration, { modelo, indetificador, fluxos, eventos, id_user, id_chat, modelo_metadata }) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE tb_rd_integracoes SET modelo = ?, indetificador = ?, fluxos = ?, eventos = ?, id_user = ?, id_chat = ?, modelo_metadata = ? WHERE id = ?`,
                [modelo, indetificador, fluxos, eventos, id_user, id_chat, modelo_metadata, id_integration], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results)
            });
        })
    }

}
