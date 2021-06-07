import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Surface } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../Context/ThemeContext";

export default function SearchBox({ navigation }) {
	const { isThemeDark } = React.useContext(ThemeContext);

	return (
		<TouchableOpacity
			style={{ width: "100%", alignItems: "center", margin: 10 }}
			onPress={() => {
				navigation.navigate("Search");
			}}
		>
			<Surface style={styles.container}>
				<Ionicons
					name={"search"}
					size={30}
					color={isThemeDark ? "#fff" : "#000"}
				/>
				<Text
					style={{ fontWeight: "bold", fontSize: 22, marginLeft: 10 }}
				>
					Search
				</Text>
			</Surface>
		</TouchableOpacity>
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
