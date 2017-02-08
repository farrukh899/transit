import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  DatePickerIOS,
  TouchableOpacity,
  Navigator
} from 'react-native';
import Geocoder from 'react-native-geocoder'
import Logo from '../../components/logo'
import TextEntry from '../../components/textInput'
import geoLocation from '../../../services/querygeolocation'
const styles = require('./styles.js');
import Icon from 'react-native-vector-icons/FontAwesome';


const _ = require('lodash')
export default class Main extends Component {
    // Initialize the constructor over here
    constructor(props) {
        // Initialize the super class
        super()
        this.state = {
            locationName: '',
            fromLocation: 'Current location',
            toLocation: 'City center',
            date: new Date(),
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
            from: {},
            to: {},
            disableSearch: true
        }
    }

    queryLocation(queryString, type) {
        if(queryString.length > 2) {
          geoLocation.getGeoLocation(queryString)
              .then((response) => {
                  switch (type) {
                    case 'from':
                      this.setState({ from: response })
                      break;
                    case 'to':
                      this.setState({ to: response })
                      break;
                  }

                  if (!_.isEmpty(this.state.to) && !_.isEmpty(this.state.from)) {
                      this.setState({ disableSearch: false });
                  }
              })
        }
    }

    toLocation(toLocation) {
        this.setState({ toLocation })
        this.queryLocation(toLocation, 'to')
    }

    fromLocation(fromLocation) {
        this.setState({ fromLocation })
        this.queryLocation(fromLocation, 'from')
    }

    changeDate() {

    }

    searchRoutes() {
        //Look for routes from here
        geoLocation.searchRoute(this.state.from, this.state.to)
            .then((response) => {
                this.props.navigator.push({
                    index: 1,
                    props: response
                })
            })
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((location) => {
            const {
                longitude,
                latitude
            } = location.coords;
            Geocoder.geocodePosition({ lat: latitude, lng: longitude })
                .then((response) => {
                    this.setState({
                        locationName: `${response[0].streetName}, ${response[0].locality}, ${response[0].country}`
                    });
                })
        });
    }

    render() {
        return(
          <View style={styles.mainContainer}>
            <Logo></Logo>
            <View style={styles.mainFields}>
              <View style={styles.infoContainer}>
                <Image source={ require('../../../res/marker-red.png')} style={styles.marker}/>
                <Text style={styles.locationText}>{this.state.locationName}</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextEntry label={ 'FROM' } placeholder={ this.state.fromLocation } onChange={ this.fromLocation.bind(this) }></TextEntry>
                <TextEntry label={ 'TO' } placeholder={ this.state.toLocation } onChange={ this.toLocation.bind(this) }></TextEntry>
              </View>

              <View style={styles.datePicker}>
                  <Text style={styles.label}>ARRIVE AT</Text>
                  <DatePickerIOS
                    date={this.state.date}
                    mode="time"
                    style={styles.pickerStyle}
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this.changeDate}/>
              </View>
              <TouchableOpacity style={styles.searchArea} disabled={this.state.disableSearch} onPress={ this.searchRoutes.bind(this) }>
                <View style={[styles.buttonSearch, !this.state.disableSearch ? { backgroundColor: '#FF3A3A' } : {backgroundColor: '#848484'}]}>
                  <Text style={styles.textButton}>VIEW OPTIONS</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )
    }
}

AppRegistry.registerComponent('Home', () => Home);
