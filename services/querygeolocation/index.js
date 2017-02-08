const config = require('../../utils/config').default.config;
const _ = require('lodash')
function getGeoLocation (inputString) {
    const url = `${config.API_BASE_URL}${config.ACCESS.geocode}&user=${config.API_USER}&pass=${config.API_PASS}&key=${inputString}`;
    return fetch(url, { method: 'GET' }).then(response => response.json())
    .then((responseJson) => {
        return _.head(responseJson);
    })
    .catch((error) => {
        console.log(error);
    })
}

function searchRoute(from, to) {
    const url = `${config.API_BASE_URL}${config.ACCESS.route}&user=${config.API_USER}&pass=${config.API_PASS}&from=${from.coords}&to=${to.coords}`;
    return fetch(url, { method: 'GET' })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        });
}

export default {
    getGeoLocation,
    searchRoute
}
