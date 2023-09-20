import { StatusBar } from "expo-status-bar";
import { Text, View, Alert } from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Weather from "./components/Weather";

export default function App() {
	const [isLoading, setIsLoadnig] = useState(false);
	const [time, setTime] = useState([]);
	const [temp, setTemp] = useState([]);
	const [error, setError] = useState(null);
	const [currentTemp, setCurrentTemp] = useState();
	const [currentTime, setCurrentTime] = useState();
	const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();

	useEffect(() => {
		const init = async () => {
			try {
				const location = await Location.getCurrentPositionAsync();
				setLatitude(location.coords.latitude.toFixed(2));
				setLongitude(location.coords.longitude.toFixed(2));
				const temperature = await fetch(
					`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=3`
				);
				const data = await temperature.json();
				setTime(data.hourly.time);
				setTemp(data.hourly.temperature_2m);
				setIsLoadnig(true);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoadnig(false);
			}
		};
		init();
	}, []);

	return isLoading ? (
		<Loading />
	) : (
		<Weather
			time={time}
			temp={temp}
			currentTime={currentTime}
			currentTemp={currentTemp}
			longitude={longitude}
			latitude={latitude}
		/>
	);
}
