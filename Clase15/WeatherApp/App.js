
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import * as Location from 'expo-location';

// --- INSTRUCCIONES ---
// 1. Ve a https://openweathermap.org/appid y crea una cuenta gratuita.
// 2. Busca la clave de API (API key) en el panel de control de tu cuenta.
// 3. Cópiala y pégala aquí abajo.
const API_KEY = '3dbb91b46a4d85add88d2f547cead5c7'; 
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('El permiso para acceder a la ubicación fue denegado.');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        if (API_KEY === 'AQUÍ_VA_TU_API_KEY') {
          setErrorMsg('Por favor, añade tu API Key de OpenWeatherMap en el código.');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric&lang=es`);
        const data = await response.json();

        if (response.ok) {
          setWeather(data);
        } else {
          setErrorMsg(data.message || 'Error al obtener el clima.');
        }

      } catch (error) {
        setErrorMsg('Error al obtener la ubicación o el clima.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#007BFF" />;
    }

    if (errorMsg) {
      return <Text style={styles.errorText}>{errorMsg}</Text>;
    }

    if (weather) {
      return (
        <View style={styles.weatherContainer}>
          <Text style={styles.locationText}>{weather.name}</Text>
          <Text style={styles.temperatureText}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.descriptionText}>{weather.weather[0].description}</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>El Clima Actual</Text>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A2533',
    marginBottom: 20,
  },
  weatherContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  locationText: {
    fontSize: 24,
    color: '#333',
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  descriptionText: {
    fontSize: 20,
    color: '#666',
    textTransform: 'capitalize',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
