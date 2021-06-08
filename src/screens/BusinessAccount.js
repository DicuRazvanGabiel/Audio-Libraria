import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { UserContext } from "../Context/UserContext";
import BookListItem from "../components/BookListItem";
import firestore from "@react-native-firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingState from "../components/LoadingState";
import SearchBox from "../components/SearchBox";

export default function BusinessAccount({ navigation }) {
	const { employee } = useContext(UserContext);

	const [businessBooks, loading, error] = useCollection(
		firestore()
			.collection("businesses")
			.doc(employee.businessID)
			.collection("businessBooks")
	);

	if (loading) return <LoadingState />;

	return (
		<>
			<SearchBox navigation={navigation} />
			<ScrollView>
				{businessBooks.docs.map((book) => (
					<BookListItem
						navigation={navigation}
						bookID={book.data().books}
						businessBookID={book.id}
						author={book.data().author}
						key={book.id}
					/>
				))}
			</ScrollView>
		</>
	);
}
