import React, { useEffect, useState, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import functions from "@react-native-firebase/functions";
import auth from "@react-native-firebase/auth";
import LoadingState from "../components/LoadingState";
import { UserContext } from "../Context/UserContext";

import HomeNavigator from "./HomeNavigator";
import SettingsScreen from "../screens/Settings";
import HomeScreen from "../screens/Home";
import BusinessAccount from "../screens/BusinessAccount";
import MyBooks from "../screens/MyBooks";

export default function MainTabNavigator() {
	const { Navigator, Screen } = createBottomTabNavigator();
	const [isEmployee, setIsEmployee] = useState(false);
	const [loading, setLoading] = useState(true);
	const { employee, setEmployee } = useContext(UserContext);

	useEffect(() => {
		functions()
			.httpsCallable("checkUserEmployee")({
				email: auth().currentUser.email,
			})
			.then((response) => {
				if (response.data.found) {
					setEmployee({
						businessID: response.data.businessID,
						employeeID: response.data.employeeID,
					});
					setIsEmployee(true);
					setLoading(false);
				} else {
					setLoading(false);
				}
			});
	}, []);

	if (loading) {
		return <LoadingState />;
	}

	return (
		<Navigator>
			{isEmployee && (
				<Screen
					name="Corporate"
					component={BusinessAccount}
					options={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName = "business-outline";
							if (focused) {
								iconName = "business";
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
			)}
			<Screen
				name="Home"
				component={HomeScreen}
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
				component={MyBooks}
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
