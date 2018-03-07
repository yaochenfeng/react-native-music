import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, SectionList ,StatusBar} from 'react-native';
import {RootScreen} from "./src/RootScreen"
export default class App extends React.Component {
    render() {
        <StatusBar
            barStyle="light-content"
            backgroundColor="#6a51ae"
        />
        return <RootScreen />;
    }
}
