import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ActivityIndicator, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser, getDataUser } from '../services/LoginService';
import Icon from 'react-native-vector-icons/FontAwesome'; // Para el ícono

const EditarPerfil = ({ navigation }) => {
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidop, setApellidop] = useState('');
  const [apellidom, setApellidom] = useState('');
  const [email, setEmail] = useState('');
  const [sexo, setSexo] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombreu, setNombreu] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUser = await AsyncStorage.getItem('token');
        const userData = await getDataUser(idUser);
        setDataUser(userData);
        setNombre(userData.nombre);
        setApellidop(userData.apellidop);
        setApellidom(userData.apellidom);
        setEmail(userData.email);
        setSexo(userData.sexo);
        setFecha(userData.fecha);
        setTelefono(userData.telefono);
        setNombreu(userData.nombreu);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validateAge = (birthdate) => {
    const today = new Date();
    const birthDateObj = new Date(birthdate);
    if (birthDateObj > today) {
      return 'La fecha no puede ser del futuro';
    }

    const age = today.getFullYear() - birthDateObj.getFullYear();
    if (age < 18) {
      return 'La persona debe ser mayor de 18 años';
    }

    return null; // Si es válido
  };

  const handleUpdate = async () => {
    if (!nombre || !apellidop || !apellidom || !email || !sexo || !fecha || !telefono || !nombreu) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    }
    
    const ageError = validateAge(fecha);
    if (ageError) {
      Alert.alert('Error', ageError);
      return;
    }

    const idUser = await AsyncStorage.getItem('token');
    try {
      await updateUser(idUser, {
        nombre,
        apellidop,
        apellidom,
        email,
        sexo,
        fecha,
        telefono,
        nombreu,
      });
      Alert.alert(
        '¡Éxito!',
        'Los datos han sido actualizados correctamente.',
        [
          {
            text: 'Aceptar',
            onPress: () => navigation.navigate('Perfil'), // Redirige al perfil
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.error('Error actualizando usuario', err);
      Alert.alert('Error', 'Error actualizando usuario. Inténtalo de nuevo más tarde.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <InputField label="Nombre" value={nombre} onChangeText={setNombre} />
          <InputField label="Apellido Paterno" value={apellidop} onChangeText={setApellidop} />
          <InputField label="Apellido Materno" value={apellidom} onChangeText={setApellidom} />
          <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <InputField label="Sexo" value={sexo} onChangeText={setSexo} />
          <InputField label="Fecha de Nacimiento" value={fecha} onChangeText={setFecha} keyboardType="datetime" />
          <InputField label="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
          <InputField label="Nombre de Usuario" value={nombreu} onChangeText={setNombreu} />
          {/* Botón personalizado para Actualizar Datos */}
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Actualizar Datos</Text>
          </TouchableOpacity>

          {/* Botón solo con ícono de Home */}
          <TouchableOpacity style={styles.homeIconButton} onPress={() => navigation.navigate('Home')}>
            <Icon name="home" size={40} color="#O492C2" />
          </TouchableOpacity>

        </>
      )}
    </View>
  );
};

const InputField = ({ label, value, onChangeText, keyboardType = 'default' }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#888',
    paddingHorizontal: 10,
    marginBottom: -15,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: -10,
    left: 10,
    zIndex: 1,
  },
  input: {
    height: 35,
    fontSize: 16,
    paddingLeft: 10,
    color: '#333',
    borderBottomWidth: 0,
  },
  updateButton: {
    backgroundColor: '#59788E',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  homeButton: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5, // Espacio entre el ícono y el texto
  },
  icon: {
    marginRight: 5,
  },
  homeIconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },  
});

export default EditarPerfil;