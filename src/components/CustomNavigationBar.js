import React from "react";
import { View, Dimensions, Platform } from "react-native";
import { Appbar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";

export default function CustomNavigationBar({ navigation, previous }) {
	const route = useRoute();
	return (
		<View
			style={{
				borderBottomLeftRadius: 30,
				borderBottomRightRadius: 30,
				overflow: "hidden",
			}}
		>
			<LinearGradient
				style={{
					width,
					paddingVertical: Platform.OS === "android" ? 7 : 0,
				}}
				start={[0, 1]}
				end={[1, 0]}
				colors={["rgba(246,110,180,1)", "rgba(254,182,101,1)"]}
			>
				<Appbar.Header
					style={{
						backgroundColor: "rgba(246,110,180,0)",
						elevation: 0,
					}}
				>
					{previous && (
						<Appbar.BackAction onPress={navigation.goBack} />
					)}
					<Appbar.Content title={route.name} />
				</Appbar.Header>
			</LinearGradient>
		</View>
	);
}
