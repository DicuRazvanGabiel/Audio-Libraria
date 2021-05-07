import React from "react";
import {
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme,
	Provider as PaperProvider,
} from "react-native-paper";
import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import functions from "@react-native-firebase/functions";
import Constants from "expo-constants";

import { ThemeContext } from "./src/Context/ThemeContext";
import { UserContext } from "./src/Context/UserContext";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

import AuthenticationNavigator from "./src/navigation/AuthenticationNavigator";

export default function App() {
	const [isThemeDark, setIsThemeDark] = React.useState(true);
	let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
	const [businessID, setBusinessID] = React.useState(null);

	const toggleTheme = React.useCallback(() => {
		return setIsThemeDark(!isThemeDark);
	}, [isThemeDark]);

	const preferences = React.useMemo(
		() => ({
			toggleTheme,
			isThemeDark,
		}),
		[toggleTheme, isThemeDark]
	);

	// Use a local emulator in development
	if (!Constants.isDevice) {
		// If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
		functions().useFunctionsEmulator("http://localhost:5001");
		console.log("Setup to emulators");
	}

	return (
		<UserContext.Provider value={{ businessID, setBusinessID }}>
			<ThemeContext.Provider value={preferences}>
				<PaperProvider theme={theme}>
					<NavigationContainer theme={theme}>
						<AuthenticationNavigator />
					</NavigationContainer>
				</PaperProvider>
			</ThemeContext.Provider>
		</UserContext.Provider>
	);
}
