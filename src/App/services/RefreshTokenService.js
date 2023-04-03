const axios = require("axios");
const qs = require("qs");
const pool = require("../../config/database");
const AuthRepository = require("../repositories/RdStationAuthRepository");
const {AppError} = require("../../error/erro");

module.exports = class RefreshTokenService {
    async execute(refresh_token) {
        const authRepository = new AuthRepository();
        return await authRepository.refreshToken({
            refresh_token: refresh_token,
            client_id: process.env.RDSTATION_CLIENT_ID,
            client_secret: process.env.RDSTATION_CLIENT_SECRET,
            grant_type: "refresh_token"
        }).then(response => {
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            const expiresIn = response.data.expires_in;
            const id = 1;

            const sql = `UPDATE tb_rd_station_auth
                         SET access_token  = ?,
                             refresh_token = ?,
                             expires_in    = ?
                         WHERE id = ${id}`;
            pool.query(sql, [accessToken, refreshToken, expiresIn], (error, results) => {
                if (error) {
                    throw new AppError("Erro ao atualizar token de acesso", 500);
                }
            });
            return {
                accessToken,
                refreshToken,
                expiresIn
            }
        })
    }

}
