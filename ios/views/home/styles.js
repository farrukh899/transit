import React, { Component, PropTypes } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var styles = StyleSheet.create({
    mainContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,
        width: Dimensions.get('window').width - 40
    },
    mainFields: {
        flex: 1,
        paddingTop: 20,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    infoContainer: {
        flexDirection: 'row',
        flex: 0,
        alignSelf: 'stretch'
    },
    inputContainer: {
        flex: 0.5,
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 70
    },
    datePicker: {
        flex:0.5,
        alignSelf: 'stretch',
        height: 80
    },
    marker: {
        width: 18,
        height: 18
    },
    locationText: {
        color: '#000000',
        paddingLeft: 10,
        fontWeight: '600'
    },
    pickerStyle: {
        borderWidth: 0
    },
    label: {
        color: '#848484',
        fontWeight: '600',
        fontSize: 12
    },
    searchArea: {
        flexDirection: 'row',
        flex: 0.3,
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonSearch: {
        height: 40,
        flex: 1,
        marginTop: 40,
        alignSelf: 'flex-end',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        color: '#FFFFFF',
        fontWeight: '600'
    }
});

module.exports = styles;
