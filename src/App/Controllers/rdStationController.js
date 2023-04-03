const pool = require("../../config/database")
const axios = require('axios');
const qs = require("qs");
const {AppErrorRDStation} = require("../../error/erro");


class RDStationIntegration {
    constructor(clientId, clientSecret, redirectUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.accessToken = null;
        this.refreshToken = null;
    }

    async getAuthorizationUrl(scope = 'contacts') {
        try {
            const authUrl = 'https://api.rd.services/auth/dialog';

            const params = new URLSearchParams({
                client_id: this.clientId,
                redirect_url: this.redirectUri,
                scope: scope || 'contacts',
            });

            return `${authUrl}?${params.toString()}`;
        } catch (error) {
            throw new AppErrorRDStation('Failed to get authorization URL', 500, error.response.data);
        }
    }

    async getAccessToken({ code, id_user }) {
        const tokenUrl = 'https://api.rd.services/auth/token';

        const postData = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirectUri,
            client_id: this.clientId,
            client_secret: this.clientSecret,
        };

        const options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
            },
        };

        try {
            const response = await axios.post(tokenUrl, qs.stringify(postData), options);
            this.accessToken = response.data.access_token;
            this.refreshToken = response.data.refresh_token;
            const expiresIn = response.data.expires_in;
            // Save access token to database

            //  date_expires_in = DATE_ADD(NOW(), INTERVAL ${expiresIn} SECOND)
            const sql = `UPDATE tb_rd_station_auth
                         SET access_token  = ?,
                             refresh_token = ?,
                             expires_in    = ?,
                             code          = ?,
                             date_expires_in = DATE_ADD(DATE_SUB(NOW(), INTERVAL 3 HOUR), INTERVAL ${expiresIn} SECOND)
                         WHERE id_user = ${id_user}`;
            pool.query(sql, [this.accessToken, this.refreshToken, expiresIn, code], (error, results) => {
                if (error) {
                    throw new AppErrorRDStation('Failed to get access token', 500, error.response.data);
                }
                console.log('Access token saved to database');
            });

            return {expiresIn, accessToken: this.accessToken, refreshToken: this.refreshToken};
        } catch (error) {
            throw new Error('Failed to get access token');
        }
    }

    async refreshAccessToken() {
        try {
            const response = await axios.post(
                'https://api.rd.services/auth/token',
                qs.stringify({
                    grant_type: 'refresh_token',
                    refresh_token: this.refreshToken,
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            const expiresIn = response.data.expires_in;
            const id = 1;


            const sql = `UPDATE tb_rd_station_auth
                         SET access_token  = ?,
                             refresh_token = ?,
                             expires_in    = ?,
                             date_expires_in = DATE_ADD(DATE_SUB(NOW(), INTERVAL 3 HOUR), INTERVAL ${expiresIn} SECOND)
                         WHERE id = ${id}`;
            console.log('sql', sql)
            pool.query(sql, [accessToken, refreshToken, expiresIn], (error, results) => {
                if (error) {
                    throw error;
                }
                console.log('Access token saved to database');
            });

            return {expiresIn, accessToken, refreshToken};
        } catch (error) {
            console.error(error);
        }
    }


}

const rdStationIntegration = new RDStationIntegration(
    process.env.RDSTATION_CLIENT_ID,
    process.env.RDSTATION_CLIENT_SECRET,
    process.env.RDSTATION_REDIRECT_URI
);

module.exports.getUserById = (id_user) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM tb_rd_station_auth WHERE id_user = ${id_user}`, (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results[0]);
        });
    });
}

const getRdStation = async (request, response) => {
    try {
        const {id_user} = request.query
        const userExist = await this.getUserById(id_user)
        if(!userExist){
            pool.query(`INSERT INTO tb_rd_station_auth (id_user)
                    VALUES (${id_user})`, (error, results) => {
                if (error) {
                    throw new AppErrorRDStation('Failed to get authorization URL', 500, error.response.data);
                }

            });
        }

        const authorizationUrl = await rdStationIntegration.getAuthorizationUrl();
        response.status(200).json({authorizationUrl});
    } catch (error) {
        console.error(error);
        response.status(500).json({message: 'Error fetching RD Station authorization URL'});
    }
};


const getAccessToken = async (request, response) => {
    const {code, id_user } = request.query;
    const accessToken = await rdStationIntegration.getAccessToken({code, id_user});
    response.json(accessToken);
};


const refreshAccessToken = async (request, response) => {
    const accessToken = await rdStationIntegration.refreshAccessToken();
    response.json(accessToken);
};


module.exports = {
    getRdStation,
    getAccessToken,
    refreshAccessToken
}

