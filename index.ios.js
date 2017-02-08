/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';
import Home from './ios/views/home';
import Background from './ios/components/background'
import RouteFinder from './views/routes'
import Icon from 'react-native-vector-icons/FontAwesome';
import DetailView from './views/routeDetail';

global = require('./utils/config')

const configureRoute = {
    LeftButton: function(route, navigator, index) {
      if(index === 1) {
          return(<TouchableOpacity style={styles.back} onPress={navigator.pop()}>
            <Icon name="angle-left" size={25} color="#FF3A3A" style={styles.icon}></Icon>
            <Text style={ styles.backText }>SEARCH</Text>
            </TouchableOpacity>)
      } else {
          return null
      }
    },
    RightButton: function(route, navigator, index) {
      return null
    },
    Title: function(route, navigator, index) {
      if(index === 1) {
          return (<View style={styles.back}><Text style={ styles.title }>SELECT BUS</Text></View>)
      } else {
          return null;
      }
    }
};

export default class transit2 extends Component {

  renderScene(route, navigator) {
    switch (route.index) {
      case 0:
        return <Background><Home navigator={ navigator }></Home></Background>
        break;
      case 1:
        return <Background><RouteFinder navigator={ navigator } routes={ route.props }></RouteFinder></Background>
        break;
      case 2:
        return <Background><DetailView navigator={ navigator } route={ route.props }></DetailView></Background>
        break;
    }
  }

  render() {
    return (
        <Navigator
            initialRoute={{ index: 0 }}
            renderScene={ this.renderScene }
            navigationBar={
              <Navigator.NavigationBar
                style={ styles.navigatorStyles }
                routeMapper={ configureRoute }/>
            }
          />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  navigatorStyles: {
      padding: 20
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  icon: {
    paddingLeft: 20
  },
  backText: {
    paddingLeft: 10,
    color: '#FF3A3A',
    fontFamily: 'AvenirNextCondensed-Medium',
    fontSize: 16
  },
  title: {
    color: '#FF3A3A',
    fontFamily: 'AvenirNextCondensed-Medium',
    fontSize: 16
  }
});

AppRegistry.registerComponent('transit2', () => transit2);
