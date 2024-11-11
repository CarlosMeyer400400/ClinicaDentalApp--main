import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { crearUsuario } from '../services/LoginService';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de instalar react-native-vector-icons

const Register = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellidop, setApellidoPaterno] = useState('');
    const [apellidom, setApellidoMaterno] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [sexo, setSexo] = useState('Hombre');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [nombreu, setNombreUsuario] = useState('');
    const [pregunta, setPreguntaSeguridad] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [contrasena2, setContrasenaConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setShowDatePicker(false);
        setFecha(currentDate);
    };

    const handleRegister = async () => {
        const age = new Date().getFullYear() - fecha.getFullYear();
        if (age < 18) {
            Alert.alert('Error', 'Debes tener al menos 18 años.');
            return;
        }

        if (contrasena !== contrasena2) {
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        try {
            await crearUsuario({
                nombre,
                apellidop,
                apellidom,
                fecha: fecha.toISOString().split('T')[0], // Formato YYYY-MM-DD
                sexo,
                telefono,
                email,
                nombreu,
                pregunta,
                respuesta,
                contrasena,
            });
            Alert.alert('Éxito', 'Registro exitoso.');
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', 'No se pudo registrar el usuario.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registro</Text>
            
            <Text style={styles.label}>Nombre </Text>
            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />
            
            <Text style={styles.label}>Apellido Paterno</Text>
            <TextInput
                placeholder="Apellido Paterno"
                value={apellidop}
                onChangeText={setApellidoPaterno}
                style={styles.input}
            />
            
            <Text style={styles.label}>Apellido Materno </Text>
            <TextInput
                placeholder="Apellido Materno"
                value={apellidom}
                onChangeText={setApellidoMaterno}
                style={styles.input}
            />
            
            <Text style={styles.label}>Fecha de Nacimiento</Text>
            <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
                <DateTimePicker
                    value={fecha}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Text style={styles.label}>{fecha.toLocaleDateString()}</Text>
            
            <Text style={styles.label}>Sexo</Text>
            <View style={styles.sexContainer}>
                <Picker
                    selectedValue={sexo}
                    onValueChange={(itemValue) => setSexo(itemValue)}
                    style={styles.select}
                >
                    <Picker.Item label="Hombre" value="Hombre" />
                    <Picker.Item label="Mujer" value="Mujer" />
                </Picker>
            </View>
            
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                style={styles.input}
            />
            
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            
            <Text style={styles.label}>Nombre de Usuario </Text>
            <TextInput
                placeholder="Nombre de Usuario"
                value={nombreu}
                onChangeText={setNombreUsuario}
                style={styles.input}
            />
            
            <Text style={styles.label}>Pregunta de Seguridad</Text>
            <TextInput
                placeholder="Pregunta de Seguridad"
                value={pregunta}
                onChangeText={setPreguntaSeguridad}
                style={styles.input}
            />
            <Text style={styles.label}>Respuesta</Text>
            <TextInput
                placeholder="Respuesta"
                value={respuesta}
                onChangeText={setRespuesta}
                style={styles.input}
            />
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Contraseña"
                    value={contrasena}
                    secureTextEntry={!showPassword}
                    onChangeText={setContrasena}
                    style={styles.passwordInput}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? "eye" : "eye-slash"} size={20} />
                </TouchableOpacity>
            </View>
            <Text style={styles.label}>Repetir Contraseña</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Repetir Contraseña"
                    value={contrasena2}
                    secureTextEntry={!showPasswordConfirm}
                    onChangeText={setContrasenaConfirm}
                    style={styles.passwordInput}
                />
                <TouchableOpacity onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                    <Icon name={showPasswordConfirm ? "eye" : "eye-slash"} size={20} />
                </TouchableOpacity>
            </View>
            
            <Button title="Registrarse" onPress={handleRegister} color="#4CAF50" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    select: {
        height: 50,
        width: '100%',
        marginBottom: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    sexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
});

export default Register;
