import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, Surface } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../Context/ThemeContext";

export default function Search({ navigation }) {
	const { isThemeDark } = React.useContext(ThemeContext);
	const [textValue, setTextValue] = useState("");
	const searchBook = async () => {
		console.log("search");
	};
	return (
		<View style={{ width: "100%", alignItems: "center", margin: 10 }}>
			<Surface style={styles.container}>
				<TouchableOpacity onPress={searchBook}>
					<Ionicons
						name={"search"}
						size={30}
						color={isThemeDark ? "#fff" : "#000"}
					/>
				</TouchableOpacity>

				<TextInput
					style={{
						fontWeight: "bold",
						fontSize: 22,
						marginLeft: 10,
						flex: 1,
						color: isThemeDark ? "#fff" : "#000",
					}}
					returnKeyType="search"
					onChangeText={setTextValue}
					value={textValue}
					onSubmitEditing={searchBook}
				/>
			</Surface>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		width: "90%",
		alignItems: "center",
		height: 50,
		elevation: 9,
		borderRadius: 10,
		padding: 10,
		flexDirection: "row",
	},
});
