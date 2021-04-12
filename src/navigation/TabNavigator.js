import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigator from "./HomeNavigator";
import SettingsScreen from "../screens/Settings";

export default function MainTabNavigator() {
	const { Navigator, Screen } = createBottomTabNavigator();
	return (
		<Navigator>
			<Screen name="Home" component={HomeNavigator} />
			<Screen name="Explore" component={HomeNavigator} />
			<Screen name="Settings" component={SettingsScreen} />
		</Navigator>
	);
}
