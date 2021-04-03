import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function LoadingState() {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<ActivityIndicator animating={true} size="large" />
		</View>
	);
}
