import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    LayoutAnimation
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import busQuery from '../../services/busLocation/index.js';
import BusDetail from '../../components/busDetail/index.js';

const moment = require('moment')
const _ = require('lodash')
const mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]

export default class DetailView extends Component {
    constructor() {
        super(),
        this.state = {
            cardWidth: Dimensions.get('window').width - 10,
            cardHeight: 100,
            detailShown: false,
            shadowOpacity: 0.4,
            availableBuses: null,
            vehicles: [],
            region: {
              latitude: 61.4452551,
              longitude: 23.8494448,
              latitudeDelta: 44.1922,
              longitudeDelta: 44.1421
            },
            markers: [],
            polyCoords:[]
        }
    }

    onRegionChange(response) {
      if (response) {
        const region = {
            latitude: parseFloat(_.split(response[0].wgs_coords, ',')[1]),
            longitude: parseFloat(_.split(response[0].wgs_coords, ',')[0]),
            latitudeDelta: 0.09922,
            longitudeDelta: 0.00421
        }
        this.setState({ region })
      }
    }

    componentDidMount() {
        console.log(this.props.route)
        const lineNo = _.filter(this.props.route[0].legs, {type: "1"});
        busQuery.getBusLocations(lineNo[0].code).then((response) => {
            this.setState({
                availableBuses: response
            })
            this.fetchBus(this.props.route, response);
        })
        const firstStop = _.filter(this.props.route[0].legs, { type: "1" })
        busQuery.getStopCoordinates(firstStop[0].locs[0].code)
            .then((response) => {
                this.onRegionChange(response)
            })
    }

    fetchBus(route) {
        // Get the bus information from the route
        const firstBus = _.filter(route[0].legs, { type: "1" });
        const firstStop = firstBus[0].locs[0];
        const routeInfo = firstBus[0].code
        // Get the buses on that route
        if (this.state.vehicles.length === 0) {
            busQuery.getBusesOnLine(firstStop.code).then((response) => {
                const busFilter = _.filter(response.body[firstStop.code], (bus) => {
                    return bus.lineRef === routeInfo
                });
                const firstStopArrivalTime = moment(firstStop.arrTime, 'YYYYMMDDHHmm').format('HH:mm');
                const selectedBus = _.filter(busFilter, (busIndex) => {
                    const time = moment(busIndex.call.aimedArrivalTime, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm');
                    return time === firstStopArrivalTime;
                });
                this.setState({
                    vehicles: selectedBus,
                    markers:[
                      {
                        latlng: {
                          latitude: parseFloat(selectedBus[0].vehicleLocation.latitude),
                          longitude: parseFloat(selectedBus[0].vehicleLocation.longitude)
                        }
                      }
                    ]
                })
            })
        }
    }

    showDetails() {
      LayoutAnimation.easeInEaseOut()
      if (!this.state.detailShown) {
        this.setState({cardHeight: this.state.cardHeight + 300, detailShown: true, shadowOpacity: 0})
      } else {
        this.setState({cardHeight: this.state.cardHeight - 300, detailShown: false, shadowOpacity: 0.4})
      }
    }
    // Calculates the departure and arrival time of the bus
    calculateDepartArive(route) {
      const startTime = moment(route[0].legs[0].locs[0].arrTime, 'YYYYMMDDHHmm').format('HH:mm')
      return startTime
    }
    calculateArrivalTime(route) {
      const endLegs = _.last(route[0].legs)
      const endTime = moment(endLegs.locs[endLegs.locs.length-1].arrTime, 'YYYYMMDDHHmm').format('HH:mm')
      return endTime
    }
    // Returns the starting route to the front end
    getStartingStop(route) {
      const busses = _.filter(route[0].legs, { type: '1'} );
      return busses[0].locs[0].name;
    }
    getEndingStop(route) {
      const busses = _.filter(route[0].legs, { type: '1'} );
      const loc = _.last(busses[busses.length-1].locs);
      return loc.name
    }
    routeType(route) {
        const busses = _.filter(route[0].legs, { type: '1' });
        return {
            connections: busses.length,
            busses: busses
        }
    }
    // Get all the relative information about the route
    getRouteInformation() {
        const route = this.props.route;
        const data = {
            startingStop: this.getStartingStop(route),
            endingStop: this.getEndingStop(route),
            departTime: this.calculateDepartArive(route),
            arrivalTime: this.calculateArrivalTime(route),
            busInfo: this.routeType(route)
        }
        return data;
    }

    render() {
        const routeInformation = this.getRouteInformation()
        return(
          <View style={ styles.container }>
            <MapView
              customMapStyle = { mapStyle }
              provider={MapView.PROVIDER_GOOGLE}
              style={ StyleSheet.absoluteFill }
              showsUserLocation={ true }
              followsUserLocation={ true }
              region={ this.state.region }>
              { this.state.markers.map((marker, index) => (
                <MapView.Marker key={ index } coordinate= { marker.latlng }/>
              )) }
              { this.props.route.steps.map((step, index) => (
                <MapView.Polyline coordinates={step.shape} key={index} geodesic={false} strokeColor='#FF3A3A' fillColor={'rgba(255,255,255,0.8)'} strokeWidth={2} lineDashPhase={2} lineDashPattern={[1,0,1]}></MapView.Polyline>
              ))}
            </MapView>
          <TouchableOpacity onPress= { this.showDetails.bind(this) }>
            <View style={ [styles.cardView, { width: this.state.cardWidth, height: this.state.cardHeight, shadowOpacity: this.state.shadowOpacity}]}>
              <View style={ styles.rowContainer }>
                <View style={ styles.rowItem }>
                  <Text style={ styles.fromTo }>FROM</Text>
                  <Text style={ styles.locationEmphasis }>{routeInformation.startingStop}</Text>
                  <View><Text style={ styles.emphasisText }>{routeInformation.departTime} <Icon name="long-arrow-right" size={15} color="#FF3A3A"></Icon>{routeInformation.arrivalTime}</Text></View>
                </View>
                <View style={ styles.rowItemEnd }>
                  <Text style={ styles.fromTo }>TO</Text>
                  <Text style={ styles.locationEmphasis }>{routeInformation.endingStop}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    cardView: {
      backgroundColor: '#FFFFFF',
      marginBottom: 30,
      borderRadius: 2,
      shadowColor: '#363636',
      shadowOffset: { width: 0, height: 1},
      shadowRadius: 0,
      shadowOpacity: 0.4,
      flexDirection: 'column',
      alignSelf: 'flex-start',
      padding: 10
    },
    fromTo: {
        color: '#959595',
        fontWeight: '600',
        fontSize: 13
    },
    locationEmphasis: {
        fontFamily: 'AvenirNextCondensed-Medium',
        fontSize: 22,
        color: '#000000'
    },
    emphasisText: {
        fontFamily: 'AvenirNextCondensed-Medium',
        fontSize: 18,
        color: '#000000'
    },
    rowContainer: {
        flexDirection: 'row',
        flex: 1
    },
    rowItem: {
        flex: 0.5,
        flexDirection: 'column'
    },
    rowItemEnd: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
})
AppRegistry.registerComponent('DetailView', () => DetailView)
