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

import busQuery from '../../services/busLocation/index.js';
const _ = require('lodash')
const mapStyle = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]

export default class DetailView extends Component {
    constructor() {
        super(),
        this.state = {
            cardWidth: Dimensions.get('window').width - 40,
            cardHeight: 200,
            detailShown: false,
            shadowOpacity: 0.4
        }
    }
    componentWillMount() {
        this.setState({
            route: this.props.route
        })
        const lineNo = _.filter(this.props.route[0].legs, {type: "1"});
        busQuery.getBusLocations(lineNo[0].code).then((response) => {
            console.log(response)
        })
    }

    showDetails() {
      LayoutAnimation.easeInEaseOut()
      if (!this.state.detailShown) {
        this.setState({cardHeight: this.state.cardHeight + 300, detailShown: true, shadowOpacity: 0})
      } else {
        this.setState({cardHeight: this.state.cardHeight - 300, detailShown: false, shadowOpacity: 0.4})
      }
    }

    render() {
        return(
          <View style={ styles.container }>
            <MapView
              customMapStyle = { mapStyle }
              provider={MapView.PROVIDER_GOOGLE}
              style={ StyleSheet.absoluteFill }
              initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}/>
          <TouchableOpacity onPress= { this.showDetails.bind(this) }>
            <View style={ [styles.cardView, { width: this.state.cardWidth, height: this.state.cardHeight, shadowOpacity: this.state.shadowOpacity}]}>

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
      borderRadius: 4,
      shadowColor: '#363636',
      shadowOffset: { width: 0, height: 1},
      shadowRadius: 0,
      shadowOpacity: 0.4
    }
})
AppRegistry.registerComponent('DetailView', () => DetailView)
