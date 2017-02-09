import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
const _ = require('lodash');
const moment = require('moment');
import BusCard from '../../components/busCard'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class RouteFinder extends Component {
    constructor(props) {
        super()
        this.state = {
            cards: <View style={ styles.card }></View>
        }
    }
    //  Navigate to route detail page
    detail(route) {
        route.steps = _.map(route[0].legs, (leg) => {
            return {
              type: leg.type,
              shape: _.map(leg.shape, (shape) => {
                return {
                    latitude: shape.y,
                    longitude: shape.x
                }
              })
            }
        })
        this.props.navigator.replacePreviousAndPop({
              props: route,
              index: 2
        });
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
    /**
      * Need to get the following information for the card
      * Starting stop name, last stop name, startTime, endTime, bus name
      * Number of stops, Number of changes required
      **/
    makeDataObject(route) {
        const data = {
            startingStop: this.getStartingStop(route),
            endingStop: this.getEndingStop(route),
            departTime: this.calculateDepartArive(route),
            arrivalTime: this.calculateArrivalTime(route),
            busInfo: this.routeType(route)
        }
        return data;
    }
    componentWillMount() {
        const cards = _.map(this.props.routes, (route, index) => {
            const routeData = this.makeDataObject(route);
            return(
              <BusCard key={index} busType={ routeData.busInfo } route={route} routeDetail={ this.detail.bind(this) }>
                <View style={ styles.rowContainer }>
                  <View style={ styles.rowItem }>
                    <Text style={ styles.fromTo }>FROM</Text>
                    <Text style={ styles.locationEmphasis }>{routeData.startingStop}</Text>
                    <View><Text style={ styles.emphasisText }>{routeData.departTime} <Icon name="long-arrow-right" size={15} color="#FF3A3A"></Icon> { routeData.arrivalTime}</Text></View>
                  </View>
                  <View style={ styles.rowItemEnd }>
                    <Text style={ styles.fromTo }>TO</Text>
                    <Text style={ styles.locationEmphasis }>{routeData.endingStop}</Text>
                  </View>
                </View>
              </BusCard>
            )
        });
        this.setState({
            cards
        })
    }
    render() {
       return(
         <ScrollView style={ styles.cardContainer } alignItems="center" justifyContent="center" alignSelf="center">
           { this.state.cards }
         </ScrollView>
       )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        flex: 1,
        alignSelf: 'flex-start'
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
    svgArrow: {
        width: 80,
        height: 30
    },
    icon: {
        margin: 10,
        padding: 10
    }
});

AppRegistry.registerComponent('RouteFinder', () => RouteFinder);
