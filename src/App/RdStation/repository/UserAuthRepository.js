const pool = require('../../../config/database');

module.exports = class UserAuthRepository {
    async findById(id_user) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM tb_rd_station_auth WHERE id_user = ${id_user}`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.length > 0 ? results[0] : null);
            });
        })
    }

    async create(id_user) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO tb_rd_station_auth (id_user) VALUES (${id_user})`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        })
    }

    async update(id_user, { access_token, refresh_token, expires_in, code }) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE tb_rd_station_auth
                        SET access_token = '${access_token}',
                            refresh_token = '${refresh_token}',
                            expires_in = ${expires_in},
                            code = '${code}',
                            date_expires_in = DATE_ADD(DATE_SUB(NOW(), INTERVAL 3 HOUR), INTERVAL ${expires_in} SECOND)
                        WHERE id_user = ${id_user}`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        })
    }

    async updateRefreshToken(id_user, { access_token, refresh_token, expires_in }) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE tb_rd_station_auth
                        SET access_token = '${access_token}',
                            refresh_token = '${refresh_token}',
                            expires_in = ${expires_in},
                            date_expires_in = DATE_ADD(DATE_SUB(NOW(), INTERVAL 3 HOUR), INTERVAL ${expires_in} SECOND)
                        WHERE id_user = ${id_user}`, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        })
    }
}
