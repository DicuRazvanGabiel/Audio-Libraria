import React from "react";
import { View } from "react-native";
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
