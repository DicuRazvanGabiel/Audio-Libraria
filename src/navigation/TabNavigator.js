import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeNavigator from "./HomeNavigator";
import SettingsScreen from "../screens/Settings";

export default function MainTabNavigator() {
	const { Navigator, Screen } = createBottomTabNavigator();
	return (
		<Navigator>
			<Screen
				name="Home"
				component={HomeNavigator}
				options={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName = "home-outline";
						if (focused) {
							iconName = "home-sharp";
						}
						return (
							<Ionicons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					},
				})}
			/>
			<Screen
				name="My Books"
				component={HomeNavigator}
				options={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName = "book-outline";
						if (focused) {
							iconName = "book-sharp";
						}
						return (
							<Ionicons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					},
				})}
			/>
			<Screen
				name="Wishlist"
				component={SettingsScreen}
				options={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName = "star-outline";
						if (focused) {
							iconName = "star-sharp";
						}
						return (
							<Ionicons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					},
				})}
			/>
		</Navigator>
	);
}
