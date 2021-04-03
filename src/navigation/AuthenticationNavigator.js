import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@react-native-firebase/auth";

import TabNavigator from "./TabNavigator";
import SignInScreen from "../screens/auth/SignIn";
import SignUpScreen from "../screens/auth/SignUp";

import MainNavigator from "./MainNavigator";

export default function AuthenticationNavigator() {
	const Stack = createStackNavigator();
	const [user, loading, error] = useAuthState(auth());

	if (error) {
		console.error(error);
	}

	return (
		<Stack.Navigator headerMode="none">
			{user ? (
				<>
					<Stack.Screen
						name="TabNavigator"
						component={TabNavigator}
					/>
				</>
			) : (
				<>
					<Stack.Screen name="Sign In" component={SignInScreen} />
					<Stack.Screen name="Sign Up" component={SignUpScreen} />
				</>
			)}
		</Stack.Navigator>
	);
}
