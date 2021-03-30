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
import { ThemeContext } from "./src/Context/ThemeContext";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
	const [isThemeDark, setIsThemeDark] = React.useState(false);
	let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

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
	return (
		<ThemeContext.Provider value={preferences}>
			<PaperProvider theme={theme}>
				<NavigationContainer theme={theme}>
					<MainNavigator />
				</NavigationContainer>
			</PaperProvider>
		</ThemeContext.Provider>
	);
}
