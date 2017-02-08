import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Logo extends Component {
    constructor() {
        super()
    }
    render() {
        return(
          <View>
            <Text style={styles.logoText}>transit</Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    logoText: {
        color: '#FF3A3A',
        fontSize: 26,
        fontWeight: '600'
    }
})

AppRegistry.registerComponent('Logo', () => Logo);
