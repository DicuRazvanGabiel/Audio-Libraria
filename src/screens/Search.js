import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Surface, Searchbar } from "react-native-paper";
import LoadingState from "../components/LoadingState";
import functions from "@react-native-firebase/functions";
import BookListItem from "../components/BookListItem";

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
			// functions()
			// 	.httpsCallable("searchBook")({
			// 		searchType: "book",
			// 		text: searchText,
			// 	})
			// 	.then(async (response) => {
			// 		console.log(response.data);
			// 		setBooks(response.data);
			// 		setIsLoading(false);
			// 	});
			console.log(searchText);
			setIsLoading(false);
		} else {
			setIsLoading(false);
		}
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
			<ScrollView>
				{books.lenght > 0 ? (
					books.map((book) => (
						<BookListItem
							navigation={navigation}
							bookID={book.books}
							businessBookID={book.id}
							author={book.author}
							key={book.id}
						/>
					))
				) : (
					<View />
				)}
			</ScrollView>
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
