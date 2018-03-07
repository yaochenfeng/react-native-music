import React, { PureComponent } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { screen, color } from '../utils';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import MainMusicScene from './MainMusicScene';
class Demo extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
            </View>
        );
    }
}

export default class DiscoverMusic extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <TouchableOpacity style={styles.searchBar}>
                <Icon name="ios-search-outline" size={15} color="#cccccc" style={styles.searchIcon}/>
                <Text style={{color: '#cccccc'}}>搜索音乐、歌词、电台</Text>
            </TouchableOpacity>
        ),
        headerLeft: <TouchableOpacity onPress={() => alert('测试')}><Icon name="ios-microphone-outline" size={30} color="#ffffff" style={{marginLeft: 20}} /></TouchableOpacity>,
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Player', {title: '播放器'})}><Icon name="ios-stats-outline" size={30} color="#ffffff" style={{marginRight: 20}} /></TouchableOpacity>,
        headerStyle: {
            backgroundColor: color.theme
        }
    });
    render() {
        const types = [
            {title: '音乐', component: MainMusicScene},
            {title: '视频', component: Demo},
            {title: '电台', component: Demo},
        ];
        return (
            <ScrollableTabView
                style={{flex: 1, backgroundColor: '#FBFCFE',}}
                tabBarBackgroundColor="#ffffff"
                tabBarActiveTextColor="#D43C33"
                tabBarInactiveTextColor="#000000"
                tabBarUnderlineStyle={{backgroundColor: '#D43C33'}}
                renderTabBar={() => <DefaultTabBar underlineStyle={styles.underlineStyle} />}
            >
                { types.map((v, i) => {
                    const Component = v.component;
                    return <Component key={i} tabLabel={v.title} navigation={this.props.navigation} />
                })}
            </ScrollableTabView>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        borderRadius: 30,
        backgroundColor: '#ffffff',
        width: screen.width / 3 * 2 ,
        height: screen.width / 12,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIcon:{
        marginRight:10,
    },
    underlineStyle:{
        height: 10,
    }
});