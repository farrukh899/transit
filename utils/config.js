const config = {
    API_USER: 'transit',
    API_PASS: 'transit_app8925',
    API_BASE_URL: 'http://api.publictransport.tampere.fi/prod',
    ACCESS: {
        geocode: '?request=geocode',
        route: '?request=route',
        stop: '?request=stop'
    },
    BUSES: {
        WITH_LINE: 'http://data.itsfactory.fi/siriaccess/vm/json?lineRef=',
        WITH_STOP: 'http://data.itsfactory.fi/journeys/api/1/stop-monitoring?stops='
    }
}

export default {
    config
}
