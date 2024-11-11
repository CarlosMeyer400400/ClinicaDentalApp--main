import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Recuperar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      {/* Aquí puedes agregar el contenido relacionado con la recuperación de contraseña */}
      <Button title="Volver a Iniciar Sesión" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Recuperar;
