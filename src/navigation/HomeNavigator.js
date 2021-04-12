import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";

export default function HomeNavigator() {
	const { Navigator, Screen } = createStackNavigator();
	return (
		<Navigator headerMode="none">
			<Screen name="Home" component={HomeScreen} />
			<Screen name="Settings" component={SettingsScreen} />
		</Navigator>
	);
}
