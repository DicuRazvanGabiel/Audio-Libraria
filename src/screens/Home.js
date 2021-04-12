import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { List, Divider, Avatar } from "react-native-paper";
import LoadingState from "../components/LoadingState";
import firestore from "@react-native-firebase/firestore";

export default function Home({ navigation }) {
	const [data, setData] = useState(null);

	const fetchBooksData = async () => {
		const booksSnap = await firestore().collection("books").get();
		const books = [];
		booksSnap.forEach((book) =>
			books.push({ id: book.id, ...book.data() })
		);
		setData(books);
	};

	useEffect(() => {
		fetchBooksData();
	}, [firestore]);

	const renderBook = (book) => {
		return (
			<TouchableOpacity
				key={book.id}
				onPress={() => {
					navigation.push("Player", { book });
				}}
			>
				<List.Item
					title={book.title}
					description={book.subtitle}
					left={(props) => (
						<Avatar.Image
							size={60}
							source={{ url: book.image.src }}
						/>
					)}
				/>
				<Divider />
			</TouchableOpacity>
		);
	};

	if (!data) {
		return <LoadingState />;
	}
	return <ScrollView>{data.map((book) => renderBook(book))}</ScrollView>;
}
