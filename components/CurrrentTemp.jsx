import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CurrentTemp = ({ currentTemp }) => {
	return (
		<View style={styles.current}>
			<Text style={styles.text}>
				Температура сейчас:&nbsp;
				<Text style={styles.span}>{Math.round(currentTemp)}°C</Text>
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	current: { justifyContent: "center" },
	text: {
		fontSize: 18,
	},
	span: {
		fontWeight: "bold",
	},
});

export default CurrentTemp;
