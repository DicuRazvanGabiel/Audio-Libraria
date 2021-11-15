import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import firestore from "@react-native-firebase/firestore";

import LoadingState from "../components/LoadingState";
import CategoryGrid from "../components/homeScreenComponents/CategoryGrid";
import BookSection from "../components/homeScreenComponents/BooksSection";
import SearchBox from "../components/SearchBox";

export default function Home({ navigation }) {
	const [data, setData] = useState(null);
	const db = firestore();
	const fetchData = async () => {
		const categoriesSnap = await db.collection("categories").get();
		const categories = [];
		categoriesSnap.forEach((cat) =>
			categories.push({ id: cat.id, ...cat.data() })
		);

		// const bestRatingBooksSnap = await db
		// 	.collection("books_info")
		// 	.orderBy("rating", "desc")
		// 	.limit(5)
		// 	.get();
		// const bestRatingBooks = [];
		// bestRatingBooksSnap.forEach((book) => {
		// 	bestRatingBooks.push({ id: book.id, ...book.data() });
		// });

		const mostPopularBooksSnap = await db
			.collection("books_info")
			.orderBy("totalBorrowedBrought", "desc")
			.limit(5)
			.get();
		const mostPopularBooks = [];
		mostPopularBooksSnap.forEach((book) => {
			mostPopularBooks.push({ id: book.id, ...book.data() });
		});

		const newestAdditionSnap = await db
		.collection("books_info")
		.orderBy("createDate", "desc")
		.limit(5)
		.get();
		const newestAddition = [];
		newestAdditionSnap.forEach((book) => {
			newestAddition.push({ id: book.id, ...book.data() });
		});


		setData({
			categories,
			// bestRatingBooks,
			mostPopularBooks,
			newestAddition
		});
	};

	useEffect(() => {
		fetchData();
	}, [firestore]);

	if (!data) {
		return <LoadingState />;
	}
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<SearchBox navigation={navigation} />
			<CategoryGrid
				categories={data.categories}
				navigation={navigation}
			/>
			{/* <BookSection
				title="Cele mai apreciate carti:"
				navigation={navigation}
				books={data.bestRatingBooks}
			/> */}
			<BookSection
				title="Cele mai populare carti:"
				navigation={navigation}
				books={data.mostPopularBooks}
			/>
			<BookSection
				title="Carti adaugate recent:"
				navigation={navigation}
				books={data.newestAddition}
			/>
		</ScrollView>
	);
}
