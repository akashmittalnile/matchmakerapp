import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DatingMessages from '../pages/Connect/Dating/DatingMessages';
import DatingBlockUserScreen from '../pages/Connect/Dating/DatingBlockUserScreen';
import DatingChat from '../pages/Connect/Dating/DatingChat';
import ChatClickprofileScreen from '../pages/Connect/Dating/ChatClickprofileScreen';
import DatingMoreInfo from '../pages/Connect/Dating/DatingMoreInfo';
import DatingProfile from '../pages/Connect/Dating/DatingProfile';
import DatingEditProfile from '../pages/Connect/Dating/DatingEditProfile';

const ConnectDatingChatListStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={DatingMessages} name="DatingMessages" />
            <Stack.Screen component={DatingChat} name="DatingChat" />
            <Stack.Screen component={ChatClickprofileScreen} name="ChatClickprofileScreen" />
            <Stack.Screen component={DatingBlockUserScreen} name="DatingBlockUserScreen" />
            {/* <Stack.Screen component = {DatingProfile} name="DatingProfile" />
            <Stack.Screen component = {DatingEditProfile} name="DatingEditProfile" />
            <Stack.Screen component = {DatingMoreInfo} name="DatingMoreInfo" /> */}
        </Stack.Navigator>

    )
}




export default ConnectDatingChatListStack