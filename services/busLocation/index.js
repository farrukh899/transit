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

export default {
    getBusLocations
}
