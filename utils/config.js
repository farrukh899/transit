const config = {
    API_USER: 'transit',
    API_PASS: 'transit_app8925',
    API_BASE_URL: 'http://api.publictransport.tampere.fi/prod',
    ACCESS: {
        geocode: '?request=geocode',
        route: '?request=route'
    },
    BUSES: {
        WITH_LINE: 'http://data.itsfactory.fi/siriaccess/vm/json?lineRef='
    }
}

export default {
    config
}
