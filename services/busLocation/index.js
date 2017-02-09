const _ = require('lodash')
const config = require('../../utils/config').default.config;


function getBusLocations(lineNumber) {
    const url = `${config.BUSES.WITH_LINE}${lineNumber}`
    return fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(responseJson => responseJson.Siri.ServiceDelivery.VehicleMonitoringDelivery[0])
}

function getBusesOnLine(stopCode) {
    const url = `${config.BUSES.WITH_STOP}${stopCode}`
    return fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(responseJson => responseJson)
}

function getStopCoordinates(stopCode) {
    const url = `${config.API_BASE_URL}${config.ACCESS.stop}&user=${config.API_USER}&pass=${config.API_PASS}&code=${stopCode}`
    return fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(responseJson => responseJson)
}

export default {
    getBusLocations,
    getBusesOnLine,
    getStopCoordinates
}
