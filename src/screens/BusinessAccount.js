import React, { useContext } from "react";
import { ScrollView, View, FlatList } from "react-native";
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
		<View style={{ flex: 1 }}>
			<SearchBox navigation={navigation} />
			<FlatList
				data={businessBooks.docs}
				renderItem={({ item }) => (
					<BookListItem
						navigation={navigation}
						bookID={item.data().books}
						businessBookID={item.id}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
}
