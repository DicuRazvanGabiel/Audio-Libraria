import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Surface, Searchbar } from "react-native-paper";
import LoadingState from "../components/LoadingState";

export default function Search({ navigation, route }) {
	const [isLoading, setIsLoading] = useState(false);
	const searchQuery = route.params.searchQuery
		? route.params.searchQuery
		: "";
	const [searchText, setSearchText] = useState(searchQuery);

	useEffect(() => {
		searchBook();
	}, [route.params.searchQuery]);

	const searchBook = async () => {
		setIsLoading(true);
		console.log(searchText);
		setIsLoading(false);
	};

	if (isLoading) return <LoadingState />;

	return (
		<View>
			<Searchbar
				style={{ margin: 10 }}
				onChangeText={(text) => setSearchText(text)}
				value={searchText}
				placeholder="Search"
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
