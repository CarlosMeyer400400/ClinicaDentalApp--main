import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Alert, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validarUsuario } from '../services/LoginService';
import { LinearGradient } from 'expo-linear-gradient';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !contrasena) {
      setErrorMessage('Por favor, ingrese correo electrónico y contraseña.');
      setShowErrorModal(true);
      return;
    }

    try {
      const response = await validarUsuario({ email, contrasena });

      if (response && response.status === 200) {
        const token = response.token.toString();
        await AsyncStorage.setItem('token', token);
        setShowModal(true); // Mostrar modal de bienvenida
      } else {
        // Muestra mensaje de error dependiendo de la respuesta
        const errorMsg = response.errorMessage || 'Credenciales incorrectas.';
        if (errorMsg.includes('correo')) {
          setErrorMessage('Error: Correo electrónico incorrecto.');
        } else if (errorMsg.includes('contraseña')) {
          setErrorMessage('Error: Contraseña incorrecta.');
        } else {
          setErrorMessage(errorMsg);
        }
        setShowErrorModal(true);
      }
    } catch (error) {
      // Maneja los errores de conexión y de solicitud
      const errorMsg = error.message.includes('correo')
        ? 'Error: Correo electrónico incorrecto.'
        : error.message.includes('contraseña')
        ? 'Error: Contraseña incorrecta.'
        : 'Ocurrió un error al intentar iniciar sesión.';
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
      console.error('Error validando usuario', error);
    }
  };

  return (
    <LinearGradient colors={['#4b79a1', '#283e51']} style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logosinfondo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.loginBox}>
          <Text style={styles.welcomeText}>Bienvenido</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Correo electrónico"
            placeholderTextColor="#666"
            style={styles.input}
          />
          
          <View style={styles.passwordContainer}>
            <TextInput
              value={contrasena}
              onChangeText={setContrasena}
              placeholder="Contraseña"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
              <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.options}>
            <TouchableOpacity>
              <Text style={styles.optionText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Recuperar')}>
              <Text style={styles.recoverText}>Recuperar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <LinearGradient colors={['#1367c2', '#1367c2']} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.subtitle}>
            ¿No tienes una cuenta?{' '}
            <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
              Regístrate aquí
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* Modal de Bienvenida */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
          navigation.navigate('Main');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bienvenido a Dental Crown</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowModal(false);
                navigation.navigate('Main');
              }}
            >
              <Text style={styles.modalButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
       {/* Modal de Error */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showErrorModal}
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowErrorModal(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  header: {
    alignItems: 'center',
    marginTop: 170,
    paddingBottom: 10,
  },  
  logo: {
    width: 200,
    height: 150,
    tintColor: '#fff',
  },
  loginBox: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    marginTop: 3,
  },  
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3a7bd5',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  registerLink: {
    color: '#2575fc',
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  passwordContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  eyeIconContainer: {
    paddingHorizontal: 5,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
    marginBottom: 30,
  },
  optionText: {
    color: '#666',
    fontSize: 14,
  },
  recoverText: {
    color: '#2575fc',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButton: {
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 0, 
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4b79a1',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#D9534F',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#1367c2',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Login;