import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import React from "react";

import Home from "../screens/HomeScreen";
import AddAlarm from "../screens/AddAlarmScreen";
import HeaderHomeStack from "./HeaderHomeStack";
import HeaderAddAlarmStack from "./HeaderAddAlarmStack";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        component={Home}
        name="HomeScreen"
        options={{header: HeaderHomeStack}} />
      <Stack.Screen
        component={AddAlarm}
        name="AddAlarmScreen"
        options={{header: HeaderAddAlarmStack}} />
    </Stack.Navigator>
  );
}
