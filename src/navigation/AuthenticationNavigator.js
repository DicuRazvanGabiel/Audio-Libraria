import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@react-native-firebase/auth";

import TabNavigator from "./TabNavigator";
import SignInScreen from "../screens/auth/SignIn";
import SignUpScreen from "../screens/auth/SignUp";
import PlayerScreen from "../screens/Player";
import SettingsScreen from "../screens/Settings";
import BookDetailsScreen from "../screens/BookDetails";
import SearchScreen from "../screens/Search";
import ResetPassword from "../screens/auth/ResetPassword";
import CategoeyScreen from "../screens/CategoryScreen";

import CustomNavigationBar from "../components/CustomNavigationBar";

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
		>
			{user ? (
				<>
					<Stack.Screen name="Home" component={TabNavigator} />
					<Stack.Screen name="Player" component={PlayerScreen} />
					<Stack.Screen name="Settings" component={SettingsScreen} />
					<Stack.Screen
						name="BookDetails"
						component={BookDetailsScreen}
					/>
					<Stack.Screen name="Search" component={SearchScreen} />
					<Stack.Screen name="Categorii" component={CategoeyScreen} />
				</>
			) : (
				<>
					<Stack.Screen name="Conectare" component={SignInScreen} />
					<Stack.Screen name="Creare cont" component={SignUpScreen} />
					<Stack.Screen
						name="Resetare parola"
						component={ResetPassword}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}
