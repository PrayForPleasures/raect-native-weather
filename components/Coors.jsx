import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Coords = ({ latitude, longitude }) => {
	return (
		<View style={styles.location}>
			<Text style={styles.text}>
				Текущая широта: <Text style={styles.span}>{latitude}</Text>
			</Text>
			<Text style={styles.text}>
				Текущая долгота: <Text style={styles.span}>{longitude}</Text>
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	location: { justifyContent: "center" },
	text: {
		fontSize: 18,
	},
	span: {
		fontWeight: "bold",
	},
});

export default Coords;
