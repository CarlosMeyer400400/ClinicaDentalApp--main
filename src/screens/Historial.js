import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCitasByUserId } from '../services/LoginService';

const Historial = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          setLoading(false);
          return;
        }

        const userId = token;
        console.log('User ID (Token):', userId);

        const data = await getAllCitasByUserId(userId);
        setCitas(data);
      } catch (error) {
        console.error('Error fetching citas:', error);
        setError('Error al cargar las citas.');
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  const renderCita = ({ item }) => (
    <View style={styles.citaContainer}>
      <Text style={styles.citaTitle}>Fecha: <Text style={styles.citaInfo}>{item.fecha}</Text></Text>
      <Text style={styles.citaTitle}>Hora: <Text style={styles.citaInfo}>{item.hora}</Text></Text>
      <Text style={styles.citaTitle}>Motivo: <Text style={styles.citaInfo}>{item.motivo}</Text></Text>
      <Text style={styles.citaTitle}>Dentista: <Text style={styles.citaInfo}>{item.dentista}</Text></Text>
      <Text style={styles.citaTitle}>Estado: <Text style={[styles.citaInfo, { color: item.estado === 'Pendiente' ? '#d9534f' : '#5cb85c' }]}>{item.estado}</Text></Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1367c2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Citas</Text>
      <FlatList
        data={citas}
        renderItem={renderCita}
        keyExtractor={(item) => item.id_cita.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f6fa',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#3a7bd5',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  citaContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#d1d9e6',
    borderWidth: 1,
  },
  citaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  citaInfo: {
    fontWeight: '400',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#d9534f',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Historial;
