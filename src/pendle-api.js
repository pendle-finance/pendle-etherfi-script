const axios = require("axios")
const dotenv = require("dotenv")
dotenv.config()


async function getAllPendleUsers(tokens) {
    const allResults = await Promise.all(tokens.map(token => queryPendleApi(token)))
    const allUsers = new Set(allResults.flat());
    return Array.from(allUsers);
}

// NO PENDLE API KEY NEEDED FOR NORMAL USAGE
async function queryPendleApi(token) {
    const headers = process.env.PENDLE_API_KEY ? {
        "x-api-key": process.env.PENDLE_API_KEY
    } : {}
    const resp = await axios.get(`https://api-v2.pendle.finance/core/v1/statistics/get-distinct-user-from-token?token=${token.toLowerCase()}&size=100000`, {
        headers
    })
    return resp.data.users;
}

module.exports = {
    getAllPendleUsers,
    queryPendleApi
}