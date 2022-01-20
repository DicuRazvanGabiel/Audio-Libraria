import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Divider } from "react-native-paper";

import BookListItem from "../components/BookListItem";
import CategoryStrip from "../components/CategoryStrip";
import LoadingState from "../components/LoadingState";

export default function CategoryScreen({ navigation, route }) {
	const [categories, setCategories] = useState(null);
	const [categoryID, setCategoryID] = useState("all");
	const [booksResult, setBooksResult] = useState([]);
	const db = firestore();

	const fetchData = async () => {
		if (categories == null) {
			const categoryPressID = route.params.categoryPressID;
			const categoriesSnap = await db.collection("categories").get();
			let cat = [{ id: "all", name: "Toate" }];
			categoriesSnap.forEach((doc) => {
				if (doc.id == categoryPressID) {
					setCategoryID(doc.id);
				}
				cat.push({ id: doc.id, name: doc.data().name });
			});
			setCategories(cat);
		}

		let books = [];
		const booksSnap = await db.collection("books_info").get();

		booksSnap.forEach((book) => {
			if (categoryID === "all") {
				books.push({ id: book.id, ...book.data() });
			} else {
				book.data().categories.map((cat) => {
					if (cat.id === categoryID) {
						books.push({ id: book.id, ...book.data() });
					}
				});
			}
		});
		setBooksResult(books);
	};

	useEffect(() => {
		fetchData();
	}, [categoryID]);

	const renderItem = ({ item }) => {
		return <BookListItem navigation={navigation} bookID={item.id} />;
	};

	if (!categories) return <LoadingState />;

	return (
		<View style={{ flex: 1 }}>
			<CategoryStrip
				categories={categories}
				setCategoryID={setCategoryID}
				categoryID={categoryID}
			/>
			<Divider />
			<FlatList
				showsVerticalScrollIndicator={false}
				data={booksResult}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}
