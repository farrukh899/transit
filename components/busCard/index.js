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

export default class BussCard extends Component {
    constructor(props) {
        super()
    }
    componentWillMount() {
      this.setState({
          route: this.props.route
      })
    }
    getBusses(busses) {
        let busAgg = undefined
        _.map(busses, (bus) => {
            busAgg = busAgg === undefined ? bus.code : `${busAgg}/${bus.code}`
        });
        return busAgg;
    }

    render() {
        return(
          <TouchableOpacity style={styles.cardContainer} onPress={ this.props.routeDetail.bind(this, this.state.route) }>
            <View style={[styles.cardPunch, styles.left]}></View>
            <View style={[styles.cardPunch, styles.right]}></View>
            {this.props.children}
            <View style={styles.seperator}></View>
            <View style={styles.bottomInfo}>
                <View style={styles.rowContainer}>
                  <View style={styles.rowItem}>
                      <Text style={styles.greyText}>TYPE</Text>
                      <Text style={styles.emphasisText}>{ this.props.busType.connections > 1 ? 'CONNECTING' : 'DIRECT'}</Text>
                  </View>
                  <View style={styles.rowItemEnd}>
                      <Text style={styles.greyText}>BUS</Text>
                      <Text style={styles.emphasisTextRed}>{ this.getBusses(this.props.busType.busses)}</Text>
                  </View>
                </View>
            </View>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        width: Dimensions.get('window').width - 48,
        height: 175,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 14,
        marginTop: 2,
        backgroundColor: '#FFFFFF',
        shadowColor: '#363636',
        shadowOffset: { width: 0, height: 1},
        borderRadius: 3,
        shadowRadius: 2,
        shadowOpacity: 0.4,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 14
    },
    cardPunch: {
        width: 6,
        height: 12,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 60,
        shadowColor: '#363636',
        shadowRadius: 1,
        shadowOpacity: 0.3,
    },
    left: {
        left: -2,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        shadowOffset: { width: 1, height: 0},
    },
    right: {
        right: -2,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        shadowOffset: { width: -1, height: 0},
    },
    seperator: {
        height: 1,
        width: Dimensions.get('window').width - 180,
        backgroundColor: '#EAEAEA',
        position: 'absolute',
        bottom: 65,
        left: 63
    },
    bottomInfo: {
        height: 60,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width - 48,
        padding: 14
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
    greyText: {
        color: '#959595',
        fontWeight: '600',
        fontSize: 13
    },
    emphasisText: {
        fontFamily: 'AvenirNextCondensed-Regular',
        fontSize: 18,
        color: '#000000'
    },
    emphasisTextRed: {
        fontFamily: 'AvenirNextCondensed-Medium',
        fontSize: 18,
        color: '#FF3A3A'
    }
})

AppRegistry.registerComponent('BusCard', () => BusCard)
