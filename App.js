import React from "react";
import { Text, TextInput, StatusBar, BackHandler } from "react-native";
import {
	DarkTheme as PaperDarkTheme,
	Provider as PaperProvider,
} from "react-native-paper";
import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import functions from "@react-native-firebase/functions";
import Constants from "expo-constants";

import { UserContext } from "./src/Context/UserContext";
import { PlayerContext } from "./src/Context/PlayerContext";

import AuthenticationNavigator from "./src/navigation/AuthenticationNavigator";

export default function App() {
	const costumePaperDarkTheme = {
		...PaperDarkTheme,
		colors: {
			...PaperDarkTheme.colors,
			primary: '#feb765',
			accent: '#f66eb4',
		},
	}

	const CombinedDarkTheme = {
		...costumePaperDarkTheme,
		...NavigationDarkTheme,
		colors: {
			...NavigationDarkTheme.colors,
			...costumePaperDarkTheme.colors,
			
		},
	};

	let theme = CombinedDarkTheme;
	const [employee, setEmployee] = React.useState(null);
	const [player, setPlayer] = React.useState(null);
	
	//for disabling text scaling for accessibility, need to change this in the future
	Text.defaultProps = Text.defaultProps || {};
	Text.defaultProps.allowFontScaling = false;
	TextInput.defaultProps = Text.defaultProps || {};
	TextInput.defaultProps.allowFontScaling = false;	
	// Use a local emulator in development
	if (!Constants.isDevice) {
		// If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
		// functions().useFunctionsEmulator("http://localhost:5001");
		// console.log("Setup to emulators");
	}

	return (
		<PlayerContext.Provider value={{ player, setPlayer }}>
			<UserContext.Provider value={{ employee, setEmployee }}>
				<PaperProvider theme={theme}>
				<StatusBar hidden={false} />
					<NavigationContainer theme={theme}>
						<AuthenticationNavigator />
					</NavigationContainer>
				</PaperProvider>
			</UserContext.Provider>
		</PlayerContext.Provider>
	);
}
