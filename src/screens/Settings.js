import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Switch, Text, Button, List } from "react-native-paper";
import { ThemeContext } from "../Context/ThemeContext";
import auth from "@react-native-firebase/auth";
import TrackPlayer from "react-native-track-player";
import { UserContext } from "../Context/UserContext";
import { PlayerContext } from "../Context/PlayerContext";
import { CommonActions } from '@react-navigation/native';



export default function Settings({ navigation }) {
	const { setPlayer } = useContext(PlayerContext);

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			
		<List.Item 
			title={`Email: ${auth().currentUser.email}`} 
			left={props => <List.Icon {...props} icon="email"/>} 	
		/>
		<List.Item 
			title={`Termeni si Conditii`} 
			left={props => <List.Icon {...props} icon="folder"/>} 	
		/>
      			
		<View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20, marginHorizontal: 20}}>
			<Button
			mode="contained"
			color="red"
				onPress={() => {
					navigation.dispatch(
						CommonActions.reset({
							index: 0,
							routes: [
							{ name: 'Settings' },
							],
						})
					);
					setPlayer(null)
					TrackPlayer.stop();
					TrackPlayer.destroy();
					auth().signOut();
				}}
			>
				Logout
			</Button>
		</View>
			
		</View>
	);
}
