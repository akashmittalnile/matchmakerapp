import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import DatingMoreInfo from '../pages/Connect/Dating/DatingMoreInfo';
import DatingYourMatches from '../pages/Connect/Dating/DatingYourMatches';

const ConnectDatingMatchesStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={DatingYourMatches} name="DatingYourMatches" />
            <Stack.Screen component={DatingMoreInfo} name="DatingMoreInfo" />
        </Stack.Navigator>

    )
}




export default ConnectDatingMatchesStack