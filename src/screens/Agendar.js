import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { addCita, getServicios, createFeedback, getFeedback } from '../services/LoginService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Agendar = ({ navigation }) => {
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hora, setHora] = useState('');
  const [selectedServicio, setSelectedServicio] = useState('');
  const [dentista, setDentista] = useState('');
  const [servicios, setServicios] = useState([]);
  const { confirmPayment } = useStripe();
  const [cardDetails, setCardDetails] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    getServicios().then(data => setServicios(data)).catch(error => console.error(error));
  }, []);

  const handleAgendar = async () => {
    if (!fecha || !hora || !selectedServicio || !dentista) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    }

    const hoy = new Date();
    if (fecha < hoy.setHours(0, 0, 0, 0)) {
      Alert.alert('Error', 'La fecha seleccionada no puede ser en el pasado.');
      return;
    }

    try {
      const idByToken = await AsyncStorage.getItem('token');
      if (!idByToken) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        return;
      }

      const cita = {
        fecha: fecha.toISOString().split('T')[0],
        hora,
        motivo: selectedServicio,
        dentista,
      };

      const response = await addCita(cita, idByToken);

      if (response.status === 200) {
        if (paymentMethod === 'card') {
          handlePayment(); // Solo llamar al pago si se usa tarjeta
        } else {
          Alert.alert('Cita agendada con éxito');
          resetForm(); // Limpiar formulario después de agendar
          setShowFeedbackForm(true); // Mostrar formulario de feedback
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema al agendar la cita');
    }
  };

  const handlePayment = async () => {
    try {
      const { paymentIntent, error } = await confirmPayment('CLIENT_SECRET_AQUÍ', {
        type: 'Card',
        billingDetails: {
          email: 'correo@ejemplo.com',
        },
      });

      if (error) {
        Alert.alert(`Error de pago: ${error.message}`);
      } else if (paymentIntent) {
        Alert.alert('Pago realizado con éxito', `ID de Pago: ${paymentIntent.id}`);
        resetForm(); // Limpiar formulario después del pago
        setShowFeedbackForm(true); // Mostrar formulario de feedback
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error al realizar el pago');
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback) {
      Alert.alert('Error', 'Por favor selecciona tu opinión.');
      return;
    }

    try {
      const idByToken = await AsyncStorage.getItem('token');
      if (!idByToken) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        return;
      }

      const data = { respuesta: feedback };
      const feedbackResponse = await createFeedback(data, idByToken);

      if (feedbackResponse.status === 200) {
        console.log('si jalo');
        Alert.alert('Gracias por responder el feedback', '', [
          {
            text: 'Ir al Home',
            onPress: () => {
              setShowFeedbackForm(false); // Ocultar formulario de feedback
              setFeedback(''); // Resetear feedback
              navigation.navigate('Home'); // Navegar al Home
            },
          },
        ]);
        console.log('Feedback enviado exitosamente'); // Mensaje en consola cuando el feedback se envía correctamente
      }
    } catch (error) {
      console.error('Error enviando feedback', error);
      Alert.alert('Error', 'Ocurrió un problema al enviar tu retroalimentación');
    }
  };

  const resetForm = () => {
    setFecha(new Date());
    setHora('');
    setSelectedServicio('');
    setDentista('');
    setPaymentMethod('cash');
    setCardDetails({});
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(Platform.OS === 'ios');
    setFecha(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Cita</Text>

      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Icon name="calendar" size={20} color="#ffffff" />
        <Text style={styles.dateButtonText}>Seleccionar Fecha</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={onChangeDate}
          minimumDate={new Date()}
        />
      )}

      <Text style={styles.selectedDateText}>Fecha seleccionada: {fecha.toISOString().split('T')[0]}</Text>

      <Picker
        selectedValue={hora}
        onValueChange={(itemValue) => setHora(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione la hora" value="" />
        <Picker.Item label="09:00 AM" value="09:00:00" />
        <Picker.Item label="09:30 AM" value="09:30:00" />
        <Picker.Item label="10:00 AM" value="10:00:00" />
        <Picker.Item label="10:30 AM" value="10:30:00" />
      </Picker>

      <Picker
        selectedValue={selectedServicio}
        onValueChange={(itemValue) => setSelectedServicio(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un motivo" value="" />
        {servicios.map((servicio) => (
          <Picker.Item key={servicio.id} label={servicio.nombre} value={servicio.nombre} />
        ))}
      </Picker>

      <Picker
        selectedValue={dentista}
        onValueChange={(itemValue) => setDentista(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un dentista" value="" />
        <Picker.Item label="Juan Perez" value="Juan Perez" />
        <Picker.Item label="Luis Hernandez" value="Luis Hernandez" />
        <Picker.Item label="Steven Univers" value="Steven Univers" />
      </Picker>

      <Picker
        selectedValue={paymentMethod}
        onValueChange={(itemValue) => setPaymentMethod(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Pago en efectivo" value="cash" />
        <Picker.Item label="Pago con tarjeta" value="card" />
      </Picker>

      {paymentMethod === 'card' && (
        <CardField
          postalCodeEnabled={true}
          placeholders={{ number: '4242 4242 4242 4242' }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => setCardDetails(cardDetails)}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleAgendar}>
        <Icon name="check" size={20} color="#ffffff" />
        <Text style={styles.submitButtonText}>Agendar</Text>
      </TouchableOpacity>

      {showFeedbackForm && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.title}>Tu opinión</Text>
          <Picker
            selectedValue={feedback}
            onValueChange={(itemValue) => setFeedback(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una opción" value="" />
            <Picker.Item label="Buena" value="bueno" />
            <Picker.Item label="Regular" value="regular" />
            <Picker.Item label="Mala" value="malo" />
          </Picker>
          <TouchableOpacity
  style={styles.submitButton}
  onPress={() => {
    handleFeedbackSubmit();  // Llama a la función que maneja el feedback
    navigation.navigate('Main', { screen: 'Home' });  // Navega a la pantalla Home
    Alert.alert("Gracias por tu opinión"); // Muestra la alerta
  }}
>
  <Text style={styles.submitButtonText}>Enviar Feedback</Text>
</TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3E5F8A',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  dateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  cardContainer: {
    height: 50,
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#efefef',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#063971',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  feedbackContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});

export default Agendar;
