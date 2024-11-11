import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const AvisoPrivacidad = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Aviso de Privacidad</Text>
      
      <Text style={styles.subtitle}>¿Para qué fines utilizaremos sus datos personales?</Text>
      <Text style={styles.text}>
        Utilizaremos su información personal para las siguientes finalidades que son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:
      </Text>
      <View style={styles.list}>
        <Text style={styles.bullet}>• Historial Médico</Text>
        <Text style={styles.bullet}>• Agenda de citas</Text>
        <Text style={styles.bullet}>• Contacto</Text>
      </View>
      
      <Text style={styles.text}>
        La negativa para el uso de sus datos personales para estas finalidades NO podrá ser motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros. De manera adicional, utilizaremos su información personal para las siguientes finalidades secundarias que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:
      </Text>
      <View style={styles.list}>
        <Text style={styles.bullet}>• Publicidad</Text>
      </View>

      <Text style={styles.text}>
        En caso de que no desee que sus datos personales sean tratados para estos fines secundarios, desde este momento usted nos puede comunicar lo anterior a través del siguiente mecanismo: 
      </Text>
      <View style={styles.list}>
        <Text style={styles.bullet}>Correo electrónico: marcollanos9.com</Text>
        <Text style={styles.bullet}>Número telefónico: 8332367591</Text>
      </View>

      <Text style={styles.subtitle}>¿Qué datos personales utilizaremos para estos fines?</Text>
      <Text style={styles.text}>
        Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:
      </Text>
      <View style={styles.list}>
        <Text style={styles.bullet}>• Datos de identificación</Text>
        <Text style={styles.bullet}>• Datos de contacto</Text>
      </View>

      <Text style={styles.text}>
        Además de los datos personales mencionados anteriormente, para las finalidades informadas en el presente Aviso de Privacidad utilizaremos los siguientes datos personales considerados como sensibles, que requieren de especial protección:
      </Text>
      <View style={styles.list}>
        <Text style={styles.bullet}>• Datos dentales (historial clínico dental, enfermedades o padecimientos previos o crónicos, entre otros)</Text>
      </View>

      <Text style={styles.subtitle}>¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso?</Text>
      <Text style={styles.text}>
        Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
      </Text>

      <Text style={styles.subtitle}>¿Cómo puede limitar el uso o divulgación de su información personal?</Text>
      <Text style={styles.text}>
        Para limitar el uso o divulgación de su información personal, le ofrecemos los siguientes medios:
      </Text>
      <View style={styles.list}>
        <Text style={styles.bullet}>• Enviando un correo a la dirección: marcollanos9.com</Text>
        <Text style={styles.bullet}>• Realizando una llamada al 8332367591</Text>
        <Text style={styles.bullet}>• Acudiendo directamente al consultorio dental</Text>
      </View>

      <Text style={styles.subtitle}>¿Cómo puede conocer los cambios en este aviso de privacidad?</Text>
      <Text style={styles.text}>
        Este aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales o nuestras propias necesidades. Nos comprometemos a mantenerlo informado a través de nuestra página web www.dentalcrown.com.mx.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#444',
    textAlign: 'justify',
  },
  list: {
    paddingLeft: 15,
    marginBottom: 20,
  },
  bullet: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
});

export default AvisoPrivacidad;
