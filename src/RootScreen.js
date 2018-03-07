import React from 'react';
import { Button, View, Text } from 'react-native';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import DiscoverMusic from "./discovermusic"
import { DetailScene } from './details';
class Demo extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
            </View>
        );
    }
}
const Tab = TabNavigator(
    {
        DiscoverMusic: {
            screen:  DiscoverMusic,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '发现音乐',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="ios-disc-outline" size={30} color={tintColor} />
                )
            })
        },
        MyMusic: {
            screen: Demo,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '我的音乐',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="ios-musical-notes-outline" size={30} color={tintColor} />
                )
            })
        },
        Friends: {
            screen: Demo,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '朋友',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="ios-contacts-outline" size={30} color={tintColor} />
                )
            })
        },
        Account: {
            screen: Demo,
            navigationOptions: {
                tabBarLabel: '账号',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="ios-person-outline" size={30} color={tintColor} />
                )
            }
        }
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        initialRouteName: 'DiscoverMusic',
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#ffffff',
            inactiveTintColor: '#cccccc',
            style: {
                backgroundColor: '#333333'
            }
        }
    }
);

export const RootScreen = StackNavigator(
    {
        Tab: { screen: Tab},
        Detail: { screen: DetailScene},
    },
    {
        navigationOptions: {
            headerBackTitle: '返回',
            headerTintColor: '#333333',
            showIcon: true
        }
    }
);
const defaultGetStateForAction = RootScreen.router.getStateForAction;
RootScreen.router.getStateForAction = (action, state) => {
    console.log("action = "+JSON.stringify(action) + "state = "+ JSON.stringify(state));

    return defaultGetStateForAction(action, state);
};