import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Surface, Searchbar } from "react-native-paper";
import LoadingState from "../components/LoadingState";
import functions from "@react-native-firebase/functions";

export default function Search({ navigation, route }) {
	const [isLoading, setIsLoading] = useState(false);
	const searchQuery = route.params.searchQuery
		? route.params.searchQuery
		: "";
	const [searchText, setSearchText] = useState(searchQuery);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		searchBook();
	}, [route.params.searchQuery]);

	const searchBook = async () => {
		setIsLoading(true);
		if (searchText !== "" || searchText !== " ") {
			functions()
				.httpsCallable("searchBook")({
					text: searchText,
				})
				.then(async (response) => {
					setBooks(response.data);
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	};

	if (isLoading) return <LoadingState />;

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => {
					navigation.push("BookDetails", {
						bookID: item.objectID,
					});
				}}
			>
				<Surface style={styles.resultContainer}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.subtitle}>{item.subtitle}</Text>
					<Text style={styles.author}>{item.author}</Text>
				</Surface>
			</TouchableOpacity>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<Searchbar
				style={{ margin: 10 }}
				onChangeText={(text) => setSearchText(text)}
				value={searchText}
				placeholder="Search"
				onSubmitEditing={() => searchBook()}
			/>

			<FlatList
				data={books}
				renderItem={renderItem}
				keyExtractor={(item) => item.objectID}
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

	resultContainer: {
		marginHorizontal: 10,
		padding: 10,
		marginBottom: 10,
		borderRadius: 10,
	},

	title: {
		fontSize: 23,
		fontWeight: "bold",
	},

	subtitle: {
		fontSize: 18,
	},

	author: {
		fontSize: 20,
		marginTop: 20,
	},
});
