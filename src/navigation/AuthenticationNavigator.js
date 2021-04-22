import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@react-native-firebase/auth";

import TabNavigator from "./TabNavigator";
import SignInScreen from "../screens/auth/SignIn";
import SignUpScreen from "../screens/auth/SignUp";
import PlayerScreen from "../screens/Player";
import SettingsScreen from "../screens/Settings";

import CustomNavigationBar from "../components/CustomNavigationBar";
import MainNavigator from "./MainNavigator";

export default function AuthenticationNavigator() {
	const Stack = createStackNavigator();
	const [user, loading, error] = useAuthState(auth());

	if (error) {
		console.error(error);
	}

	return (
		<Stack.Navigator
			screenOptions={{
				header: (props) => <CustomNavigationBar {...props} />,
			}}
			mode="modal"
		>
			{user ? (
				<>
					<Stack.Screen name="Home" component={TabNavigator} />
					<Stack.Screen name="Player" component={PlayerScreen} />
					<Stack.Screen name="Settings" component={SettingsScreen} />
				</>
			) : (
				<>
					<Stack.Screen
						name="Sign In"
						component={SignInScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Sign Up"
						component={SignUpScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}
