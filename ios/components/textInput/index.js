import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput
} from 'react-native';

export default class TextEntry extends Component {
    constructor(props) {
        super()
        this.props = props;
        this.state = {
            label: this.props.label,
            placeholder: this.props.placeholder
        }
    }
    componentWillMount() {

    }
    render() {
        return(
          <View style={styles.inputFieldContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>{this.state.label}</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
              style={styles.inputField}
              onChangeText={ this.props.onChange.bind(this) }
              placeholder={this.props.placeholder}/>

            </View>
          </View>
        )
    }
}


const styles = StyleSheet.create({
    inputFieldContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        width: Dimensions.get('window').width - 80
    },
    inputField: {
        height: 40,
        fontSize: 24
    },
    inputWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#979797'
    },
    labelText: {
        color: '#848484',
        fontWeight: '600',
        fontSize: 12
    }
});

AppRegistry.registerComponent('TextEntry', () => TextEntry);
