import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getDataInformacion } from '../services/LoginService';
import { LinearGradient } from 'expo-linear-gradient';

const QuienesSomos = () => {
  const [dataInformacion, setDataInformacion] = useState({
    mision: '',
    vision: '',
    quienessomos: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const idInformacion = '1';
    getDataInformacion(idInformacion)
      .then((data) => {
        setDataInformacion(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1367c2" />
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={() => (
        <LinearGradient colors={['#c3dafa', '#84b6f4']} style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quiénes Somos</Text>
            <Image source={require('../assets/somos.jpg')} style={styles.image} />
            <Text style={styles.cardContent}>{dataInformacion.quienessomos}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Misión</Text>
            <Text style={styles.cardContent}>{dataInformacion.mision}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Visión</Text>
            <Text style={styles.cardContent}>{dataInformacion.vision}</Text>
          </View>
        </LinearGradient>
      )}

    />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1367c2',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#283e51',
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 25,
    color: '#1367c2',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#333333',
    marginVertical: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 280,
    height: 180,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuienesSomos;
