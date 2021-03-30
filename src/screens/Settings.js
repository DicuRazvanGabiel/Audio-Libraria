import React, { useState } from "react";
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { ThemeContext } from "../Context/ThemeContext";

export default function Settings() {
	const [isSwitchOn, setIsSwitchOn] = useState(false);
	const { toggleTheme, isThemeDark } = React.useContext(ThemeContext);

	const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "space-evenly",
				alignItems: "center",
			}}
		>
			<Text>Settings screen</Text>
			<Switch value={isThemeDark} onValueChange={toggleTheme} />
		</View>
	);
}
