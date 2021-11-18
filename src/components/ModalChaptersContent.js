import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Text, Divider, useTheme, Title, Subheading } from "react-native-paper";

import { convertMinutesHours } from "../Utils";

export default function ModalChaptersContent({
	chapters,
	currentChapter,
	onChangeChapter,
}) {
	const theme = useTheme();
	const ViewTouchable = onChangeChapter ? TouchableOpacity : View;

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
			}}
		>
			<View
				style={{
					backgroundColor: theme.colors.surface,
					width: "100%",
					borderRadius: 20,
				}}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					{chapters.map((c,i) => (
						<ViewTouchable
							style={{ marginBottom: 20 }}
							onPress={() => {
								onChangeChapter(i);
							}}
							key={i}
						>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<View
									style={{
										justifyContent: "space-between",
										flexDirection: "row",
									}}
								>
									<Title
										style={[
											{ fontSize: 20, flex: 2 },
											currentChapter === c.name && {
												color: "red",
											},
										]}
									>
										{c.name}
									</Title>

									<Subheading
										style={[
											{ textAlign: "right", flex: 1 },
											currentChapter === c.name && {
												color: "red",
											},
										]}
									>
										{convertMinutesHours(c.duration)}
									</Subheading>
								</View>
							</View>
							<Divider />
						</ViewTouchable>
					))}
				</ScrollView>
			</View>
		</View>
	);
}
