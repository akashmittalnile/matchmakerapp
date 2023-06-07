import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './HomeStack';
import WeelStack from './WeelStack';
import ProfileStack from './ProfileStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Mycolors } from '../utility/Mycolors';

import ConnectDatingProfileStack from './ConnectDatingProfileStack';
import ConnectDatingChatListStack from './ConnectDatingChatListStack';
import DatingYourMatches from '../pages/Connect/Dating/DatingYourMatches';

const DatingBottomNav = ({ userToken }) => {
  //variables
  const Tab = createBottomTabNavigator();
  const screenOptions = {
    showLabel: false,
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: styles.navigatorStyle,
  };
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={screenOptions}>
      <Tab.Screen
        name={'WeelStack'}
        component={WeelStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabStyle}>
              {focused
                ? <Image source={require('../assets/Houseyellow.png')} style={{ width: 28, height: 28,tintColor:'#FFA5C5' }} />
                : <Image source={require('../assets/HouseGray.png')} style={{ width: 28, height: 28 }} />
              }
              <Text style={{ color: focused ? '#FFA5C5' : Mycolors.GrayColor, fontWeight: 'bold' }}>Home</Text>
            </View>
          ),
        }}
      />

<Tab.Screen
        name={'DatingYourMatches'}
        component={DatingYourMatches}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabStyle}>
              {focused
                ? 
                <MaterialCommunityIcons name={"heart-multiple"} color={'#FFA5C5'} size={28} />
                // <Image source={require('../assets/UserYellow.png')} style={{ width: 21, height: 21 }} />

                : 
                <MaterialCommunityIcons name={"heart-multiple"} color={'gray'} size={28} />
              }
              <Text style={{ color: focused ? '#FFA5C5' : Mycolors.GrayColor, fontWeight: 'bold' }}>Matches</Text>

            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'ConnectDatingChatListStack'}
        component={ConnectDatingChatListStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabStyle}>
              {focused
                ? <Ionicons name={"chatbox-outline"} color={'#FFA5C5'} size={28} />
                : <Ionicons name={"chatbox-outline"} color={'gray'} size={28} />
              }
              <Text style={{ color: focused ? '#FFA5C5' : Mycolors.GrayColor, fontWeight: 'bold' }}>Chat</Text>

            </View>
          ),
        }}
      />


      <Tab.Screen
        name={'ConnectDatingProfileStack'}
        component={ConnectDatingProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabStyle}>
              {focused
                ? <Image source={require('../assets/UserYellow.png')} style={{ width: 28, height: 28,tintColor:'#FFA5C5' }} />
                : <Image source={require('../assets/UserGray.png')} style={{ width: 28, height: 28 }} />
              }
              <Text style={{ color: focused ? '#FFA5C5' : Mycolors.GrayColor, fontWeight: 'bold' }}>Profile</Text>

            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  navigatorStyle: {
    height:80,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderTopColor:'#FFA5C5',
  borderLeftColor:'#FFA5C5',
  borderRightColor:'#FFA5C5',
    borderWidth: 2,
    backgroundColor: Mycolors.BG_COLOR,
    shadowColor: '#FFA5C5',
  shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    justifyContent: 'center',
    elevation: 5
  },
  tabStyle: {
    alignItems: 'center',
  },

});
export default DatingBottomNav