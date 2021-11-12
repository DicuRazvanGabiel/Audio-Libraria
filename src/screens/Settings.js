import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Switch, Text, Button } from "react-native-paper";
import { ThemeContext } from "../Context/ThemeContext";
import auth from "@react-native-firebase/auth";
import TrackPlayer from "react-native-track-player";
import { UserContext } from "../Context/UserContext";
import { PlayerContext } from "../Context/PlayerContext";


export default function Settings() {
	const [isSwitchOn, setIsSwitchOn] = useState(false);
	const { setPlayer } = useContext(PlayerContext);

	const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "space-between",
				margin: 10
			}}
		>
			<Text style={{fontSize: 20}}>
				Email: {auth().currentUser.email}
			</Text>

			{/* <Text>Settings screen</Text>
			<Switch value={isThemeDark} onValueChange={toggleTheme} /> */}
			<Button
			mode="contained"
			color="red"
				onPress={() => {
					setPlayer(null)
					TrackPlayer.stop();
					TrackPlayer.destroy();
					auth().signOut();
				}}
			>
				Logout
			</Button>
		</View>
	);
}
