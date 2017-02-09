import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text
} from 'react-native'

export default class BusDetail extends Component {
    constructor() {
        super()
    }

    render() {
        return(
          <View></View>
        )
    }
}

const styles = StyleSheet.create({})
AppRegistry.registerComponent('BusDetail', ()=> BusDetail)
