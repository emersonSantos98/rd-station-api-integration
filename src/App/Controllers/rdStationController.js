// const pool = require("../../config/database")
const axios = require('axios');
const qs = require("qs");


    class RDStationIntegration {
            constructor(clientId, clientSecret, redirectUri) {
                this.clientId = clientId;
                this.clientSecret = clientSecret;
                this.redirectUri = redirectUri;
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
                console.error(error);
            }
        }

            async getAccessToken(code) {
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
                const accessToken = response.data.access_token;
                const refreshToken = response.data.refresh_token;
                const expiresIn = response.data.expires_in;

                return {accessToken, refreshToken, expiresIn};
            } catch (error) {
                console.error('erros', error);
                throw new Error('Failed to get access token');
            }
        }
    }

        const rdStationIntegration = new RDStationIntegration(
            process.env.RDSTATION_CLIENT_ID,
            process.env.RDSTATION_CLIENT_SECRET,
            process.env.RDSTATION_REDIRECT_URI
        );
console.log('rdStationIntegration', rdStationIntegration)

    const getRdStation = async (request, response) => {
    try {
        const authorizationUrl = await rdStationIntegration.getAuthorizationUrl();
        response.status(200).json({authorizationUrl});
    } catch (error) {
        console.error(error);
        response.status(500).json({message: 'Error fetching RD Station authorization URL'});
    }
};


    const getAccessToken = async (request, response) => {
    const {code} = request.query;
    const accessToken = await rdStationIntegration.getAccessToken(code);
    // console.log('accessToken', accessToken)
    response.json(accessToken);
    };


    module.exports = {
    getRdStation,
    getAccessToken,
    }

