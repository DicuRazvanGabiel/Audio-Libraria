import React from "react";
import { View, Dimensions, Platform, TouchableOpacity } from "react-native";
import { Appbar, useTheme, Avatar } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";

export default function CustomNavigationBar({ navigation, previous }) {
	const route = useRoute();
	const { colors } = useTheme();

	return (
		<View style={{ backgroundColor: colors.background }}>
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
						<TouchableOpacity
							style={{ marginRight: 10, marginBottom: 10 }}
							onPress={() => navigation.push("Settings")}
						>
							<Avatar.Image
								size={45}
								source={{
									uri:
										"https://static.remove.bg/remove-bg-web/a6c5f1017e9c0bdc648aad9debd2f40a17d45814/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
								}}
							/>
						</TouchableOpacity>
					</Appbar.Header>
				</LinearGradient>
			</View>
		</View>
	);
}
