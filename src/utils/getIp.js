const axios = require("axios");

async function myIP() {
    const response = await axios.get('https://curlmyip.org/').then(resp => console.log(resp.data));
    return await response;
}

module.exports = myIP;