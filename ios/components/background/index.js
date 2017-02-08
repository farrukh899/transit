import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Background extends Component {
    // Initialize the constructor here
    constructor(props) {
        // Call the super class
        super()
    }
    // Will mount function for when we want to fetch some data before component
    // will mount
    componentWillMount() {

    }

    render() {
        return(
          <View style={styles.containerWrapper}>
            <Image source={ require('../../../res/background.jpg') } style={styles.backgroundStyle}>
              <View style={styles.imageOverlay}>
                {this.props.children}
              </View>
            </Image>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    containerWrapper: {
        flex: 1,
        flexDirection: 'column'
    },
    backgroundStyle: {
        width: width,
        height: height,
        resizeMode: 'cover'
    },
    imageOverlay: {
        width: width,
        height: height,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: 40,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'rgba(255,255,255,0.98)'
    }
});

AppRegistry.registerComponent('Background', () => Background);
