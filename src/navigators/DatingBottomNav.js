import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WeelStack from './WeelStack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Mycolors } from '../utility/Mycolors';
import { useSelector, useDispatch } from 'react-redux';
import ConnectDatingProfileStack from './ConnectDatingProfileStack';

import CustomModal from '../pages/Connect/Dating/CustomModal';
import { Use } from 'react-native-svg';
import ConnectDatingMatchesStack from './ConnectDatingMatchesStack';
import ConnectDatingChatListStack from './ConnectDatingChatListStack';

const DatingBottomNav = ({ userToken }) => {
  const User = useSelector(state => state.user.match_profiledata);
  const chatindictor = useSelector(state => state.user.chat_counter);
  console.log("ajdajsbdja", User);
  console.log("ajdajschat", chatindictor);
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
                ? <Image source={require('../assets/homebottomicon.png')} style={{ width: 26, height: 24, tintColor: '#E94057' }} />
                : <Image source={require('../assets/homebottomicon.png')} style={{ width: 26, height: 24, tintColor: '#ADAFBB' }} />
              }
              {/* <Text style={{ color: focused ? '#FFA5C5' : Mycolors.GrayColor, fontWeight: 'bold' }}>Home</Text> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'ConnectDatingMatchesStack'}
        component={ConnectDatingMatchesStack}
         
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabStyle}>
              {focused
                ?
                <Image source={require('../assets/Heart_Vector.png')} style={{ width: 24, height: 21 }} />
                // <MaterialCommunityIcons name={"heart-multiple"} color={'#FFA5C5'} size={28} />
                // <Image source={require('../assets/UserYellow.png')} style={{ width: 21, height: 21 }} />

                : <View>
                  {
                    User > 0 ?


                      (<View>
                        <View style={{ position: 'absolute', right: -5, top: -5, elevation: 1, overflow: 'hidden', width: 12, height: 12, borderRadius: 10, backgroundColor: 'transparent' }}>
                          <Image source={require('../assets/Ellipse_red_dot.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <Image source={require('../assets/Heart_Vector.png')} style={{ width: 24, height: 21, tintColor: '#ADAFBB' }} />
                      </View>
                      )
                      :
                      (<Image source={require('../assets/Heart_Vector.png')} style={{ width: 24, height: 21, tintColor: '#ADAFBB' }} />
                        // <MaterialCommunityIcons name={"heart-multiple"} color={'gray'} size={28} /> 
                      )
                  }
                </View>

              }
              {/* <Text style={{ color: focused ? '#FFA5C5' : Mycolors.GrayColor, fontWeight: 'bold' }}>Matches</Text> */}

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
                ? <Image source={require('../assets/message_Vector_red.png')} style={{ width: 26, height: 24, }} />
                // <Ionicons name={"chatbox-outline"} color={'#FFA5C5'} size={28} />
                :
                <View>
                  {
                    chatindictor > 0 ?


                      (<View>
                        <View style={{ position: 'absolute', right: -5, top: -5, elevation: 1, overflow: 'hidden', width: 12, height: 12, borderRadius: 10, backgroundColor: 'transparent' }}>
                          <Image source={require('../assets/Ellipse_red_dot.png')} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <Image source={require('../assets/message_Vector.png')} style={{ width: 26, height: 24, }} />
                      </View>
                      )
                      :
                      (<Image source={require('../assets/message_Vector.png')} style={{ width: 26, height: 24, }} />
                        // <Ionicons name={"chatbox-outline"} color={'gray'} size={28} />
                      )
                  }
                </View>




              }
              {/* <Text style={{ color: focused ? '#FFA5C5' : Mycolors.GrayColor, fontWeight: 'bold' }}>Chat</Text> */}

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
                ? <Image source={require('../assets/people_Vector.png')} style={{ width: 28, height: 28, tintColor: '#E94057' }} />
                : <Image source={require('../assets/people_Vector.png')} style={{ width: 28, height: 28 }} />
              }
              {/* <Text style={{ color: focused ? '#FFA5C5' : Mycolors.GrayColor, fontWeight: 'bold' }}>Profile</Text> */}

            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  navigatorStyle: {
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor: '#FFA5C5',
    borderLeftColor: '#FFA5C5',
    borderRightColor: '#FFA5C5',
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