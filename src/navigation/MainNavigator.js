import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";

const { Navigator, Screen } = createStackNavigator();

export default function MainNavigator() {
	return (
		<Navigator headerMode="none">
			<Screen name="Home" component={HomeScreen} />
			<Screen name="Settings" component={SettingsScreen} />
		</Navigator>
	);
}
