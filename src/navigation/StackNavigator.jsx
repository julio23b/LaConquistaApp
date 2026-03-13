import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '../screens/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CommerceDetailScreen from '../screens/CommerceDetailScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="CommerceDetail" component={CommerceDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
