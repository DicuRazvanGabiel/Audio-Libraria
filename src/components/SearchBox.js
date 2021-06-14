import React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";

export default function SearchBox({ navigation }) {
	const [searchQuery, setSearchQuery] = React.useState("");
	const onChangeSearch = (query) => setSearchQuery(query);

	return (
		<View style={{ margin: 10 }}>
			<Searchbar
				placeholder="Search"
				onChangeText={onChangeSearch}
				value={searchQuery}
				onSubmitEditing={() =>
					navigation.navigate("Search", {
						searchQuery,
					})
				}
			/>
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
