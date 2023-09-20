import { StatusBar } from "expo-status-bar";
import {
	Text,
	View,
	Alert,
	StyleSheet,
	Keyboard,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Weather from "./components/Weather";
import Coords from "./components/Coors";
import { LinearGradient } from "expo-linear-gradient";
import CurrentTemp from "./components/CurrrentTemp";

export default function App() {
	const [isLoading, setIsLoadnig] = useState(true);
	const [time, setTime] = useState([]);
	const [temp, setTemp] = useState([]);
	const [error, setError] = useState(null);
	const [currentTemp, setCurrentTemp] = useState();
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [userGeo, setUserGeo] = useState({});

	useEffect(() => {
		const init = async () => {
			try {
				const location = await Location.getCurrentPositionAsync();
				setLatitude(location.coords.latitude.toFixed(2));
				setLongitude(location.coords.longitude.toFixed(2));
			} catch (error) {
				setError(error);
			} finally {
				setIsLoadnig(false);
			}
		};
		init();
		const initS = async () => {
			try {
				const temperature = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true&forecast_days=3`
				);
				const current = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`
				);
				const data = await temperature.json();
				const currentData = await current.json();
				setTime(data.hourly.time);
				setTemp(data.hourly.temperature_2m);
				setCurrentTemp(currentData.current_weather.temperature);
				setIsLoadnig(false);
			} catch (error) {
				setError(error);
			}
		};
		initS();
	}, []);

	const setLocation = () => {
		const init = async () => {
			try {
				const temperature = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${userGeo.lat}&longitude=${userGeo.long}&hourly=temperature_2m&current_weather=true&forecast_days=3`
				);
				const current = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${userGeo.lat}&longitude=${userGeo.long}&hourly=temperature_2m&current_weather=true`
				);
				const data = await temperature.json();
				const currentData = await current.json();
				setTime(data.hourly.time);
				setTemp(data.hourly.temperature_2m);
				setCurrentTemp(currentData.current_weather.temperature);
			} catch (error) {
				setError(error);
			}
		};
		Keyboard.dismiss();
		init();
	};

	if (isLoading) {
		return <Loading />;
	} else
		return (
			<>
				<StatusBar style="auto" />
				<LinearGradient
					style={styles.container}
					colors={["lightblue", "whitesmoke", "lightblue"]}
					start={{ x: 1, y: 0.15 }}
				>
					<View style={styles.line}></View>

					<CurrentTemp currentTemp={currentTemp} />

					<View style={styles.line}></View>

					<Coords
						latitude={latitude}
						longitude={longitude}
						currentTemp={currentTemp}
					/>

					<SafeAreaView>
						<View style={styles.text_box}>
							<Text style={styles.text}>Укажите свою геолокацию</Text>
							<Text>в формате: 52.11 / 32.89</Text>
						</View>
						<View style={styles.input_box}>
							<TextInput
								placeholder="введите ширину"
								style={styles.input}
								value={userGeo.lat}
							/>
							<Text>&nbsp;/&nbsp;</Text>
							<TextInput
								placeholder="введите долготу"
								style={styles.input}
								value={userGeo.long}
							/>
						</View>
						<TouchableOpacity style={styles.touch_box} onPress={setLocation}>
							<Text>Подтвердить</Text>
						</TouchableOpacity>
					</SafeAreaView>

					<View style={styles.line}></View>

					<Weather time={time} temp={temp} />
				</LinearGradient>
			</>
		);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 8,
	},
	line: {
		height: 1,
		width: "100%",
		marginBottom: 40,
		marginTop: 40,
		backgroundColor: "#222222",
	},
	button: {
		width: 300,
		borderColor: "#222222",
		borderWidth: 1,
		borderRadius: 5,
		alignItems: "center",
		padding: 4,
		marginTop: 20,
	},
	text_box: {
		marginTop: 40,
		borderColor: "#222222",
		borderWidth: 1,
		borderRadius: 5,
		alignItems: "center",
	},
	text: {
		fontWeight: "bold",
	},
	input_box: {
		flexDirection: "row",
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		height: 28,
		width: 140,
		borderColor: "#222222",
		borderWidth: 1,
		borderRadius: 5,
		textAlign: "center",
	},
	touch_box: {
		borderWidth: 1,
		borderColor: "#222222",
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
		height: 28,
	},
});
