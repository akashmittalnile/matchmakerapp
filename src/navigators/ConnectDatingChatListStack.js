import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DatingMessages from '../pages/Connect/Dating/DatingMessages';
import DatingBlockUserScreen from '../pages/Connect/Dating/DatingBlockUserScreen';
import DatingChat from '../pages/Connect/Dating/DatingChat';

const ConnectDatingChatListStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={DatingMessages} name="DatingMessages" />
            <Stack.Screen component={DatingChat} name="DatingChat"   />
            <Stack.Screen component={DatingBlockUserScreen} name="DatingBlockUserScreen" />
        </Stack.Navigator>

    )
}




export default ConnectDatingChatListStack