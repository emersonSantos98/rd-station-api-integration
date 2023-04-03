const RDStationIntegration = require('../App/Controllers/rdStationController');

async function rdStationTokenRenewal(req, res, next) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    console.log('RDStationIntegration.expiresIn', RDStationIntegration.expiresIn)

    if (RDStationIntegration.expiresIn - currentTimestamp > 60) {
        return next();
    }

    try {
        const tokenData = await RDStationIntegration.refreshAccessToken();
        req.headers.authorization = `Bearer ${tokenData.accessToken}`;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to refresh RD Station access token' });
    }
}

module.exports = rdStationTokenRenewal;
