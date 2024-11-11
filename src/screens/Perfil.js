import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataUser } from '../services/LoginService';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

const Perfil = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const id = await AsyncStorage.getItem('token');
          if (id) {
            const data = await getDataUser(id);
            setUserData(data);
          } else {
            setError('No se encontró el ID del usuario.');
          }
        } catch (err) {
          setError('Error obteniendo los datos del perfil.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [])
  );


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
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
      <Text style={styles.headerText}>Perfil</Text>
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Editar Perfil')}>
          <Icon name="pencil" size={16} color="#1a73e8" />
          <Text style={styles.editText}> Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      {userData && (
        <View style={styles.infoContainer}>
          <InfoRow label="Nombre" value={userData.nombre} />
          <InfoRow label="Apellido Paterno" value={userData.apellidop} />
          <InfoRow label="Apellido Materno" value={userData.apellidom} />
          <InfoRow label="Fecha de Nacimiento" value={userData.fecha} />
          <InfoRow label="Sexo" value={userData.sexo} />
          <InfoRow label="Teléfono" value={userData.telefono} />
          <InfoRow label="Nombre de Usuario" value={userData.nombreu} />
          <InfoRow label="Correo Electrónico" value={userData.email} />
        </View>
      )}
    </View>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a73e8',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileHeader: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#1a73e8',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  editText: {
    color: '#1a73e8',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#1a73e8',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default Perfil;
