import React, { useState, useContext } from "react";
import { View, Linking } from "react-native";
import {  Button, List } from "react-native-paper";
import { ThemeContext } from "../Context/ThemeContext";
import auth from "@react-native-firebase/auth";
import TrackPlayer from "react-native-track-player";
import { PlayerContext } from "../Context/PlayerContext";
import { CommonActions } from '@react-navigation/native';



export default function Settings({ navigation }) {
	const { setPlayer } = useContext(PlayerContext);
	
	const openLinkInBrowser = (link) =>{
		Linking.openURL(link)
	}

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
			onPress={() => openLinkInBrowser('https://audiobiblioteca.ro/wp-content/uploads/2022/01/Termeni.pdf')}
			title={`Termeni si Conditii`} 
			left={props => <List.Icon {...props} icon="folder"/>} 	
		/>
		<List.Item
			onPress={() => openLinkInBrowser('https://audiobiblioteca.ro/wp-content/uploads/2022/01/GDPR.pdf')} 
			title={`Protectia datelor cu caracter personal`} 
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
