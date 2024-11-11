import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Matter from 'matter-js';

// Importar la imagen del dentista
const dentistImage = require('./personajesjuego/dentista.png');
const candyImage = require('./personajesjuego/picafresa.png'); 

// Configuración inicial del juego
const Juego = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [engine, setEngine] = useState(null);
  const [world, setWorld] = useState(null);
  const [dentist, setDentist] = useState(null);
  const [candies, setCandies] = useState([]);
  const [score, setScore] = useState(0); // Contador de dulces rotos

  // Iniciar el juego
  const handlePlay = () => {
    setIsPlaying(true);
    Alert.alert('¡Juego Iniciado!', '¡Buena suerte!');
    initializeGame();
  };

  // Inicializar la lógica del juego
  const initializeGame = () => {
    const engine = Matter.Engine.create();
    const world = engine.world;

    // Crear el dentista como un cuerpo en el mundo
    const dentistBody = Matter.Bodies.rectangle(200, 400, 50, 50, {
      label: 'dentist',
      isStatic: true, // El dentista no se mueve
    });

    Matter.World.add(world, dentistBody);
    setDentist(dentistBody);
    setEngine(engine);
    setWorld(world);

    // Iniciar la caída de dulces
    const dropCandies = () => {
      const candy = Matter.Bodies.circle(Math.random() * 400, 0, 20, { label: 'candy', restitution: 0.5 });
      Matter.World.add(world, candy);
      setCandies(prevCandies => [...prevCandies, candy]);
    };

    const candyInterval = setInterval(dropCandies, 2000); // Crear un dulce cada 2 segundos

    // Limpiar el intervalo al final
    return () => clearInterval(candyInterval);
  };

  // Lógica para actualizar la posición de los dulces
  useEffect(() => {
    if (isPlaying && engine) {
      const update = () => {
        Matter.Engine.update(engine);
        checkCollisions(); // Verificar colisiones

        // Eliminar dulces que han salido de la pantalla
        setCandies(prevCandies => prevCandies.filter(candy => candy.position.y < 600)); // Ajusta según tu diseño
      };

      const interval = setInterval(update, 1000 / 60); // 60 FPS
      return () => clearInterval(interval);
    }
  }, [isPlaying, engine]);

  // Función para verificar colisiones
  const checkCollisions = () => {
    if (dentist) {
      candies.forEach(candy => {
        const collision = Matter.SAT.collides(dentist, candy);
        if (collision.collided) {
          setIsPlaying(false); // Finalizar el juego
          Alert.alert('Game Over', `¡Game Over! Rompiste ${score} dulces.`);
        }
      });
    }
  };

  // Funciones para mover el dentista
  const moveDentist = (direction) => {
    if (dentist) {
      const newPosition = dentist.position.x + (direction === 'left' ? -20 : 20);
      Matter.Body.setPosition(dentist, { x: newPosition, y: dentist.position.y });
    }
  };

  // Función para disparar dentintas
  const shootDentinta = () => {
    if (dentist) {
      const dentinta = Matter.Bodies.rectangle(dentist.position.x, dentist.position.y, 10, 10, { label: 'dentinta' });
      Matter.Body.setVelocity(dentinta, { x: 0, y: -10 }); // Disparar hacia arriba
      Matter.World.add(world, dentinta);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Juego</Text>
      <Text style={styles.score}>Dulces Rotos: {score}</Text>

      {isPlaying ? (
        <View style={styles.gameArea}>
          {/* Renderizar el dentista */}
          {dentist && (
            <Image
              source={dentistImage}
              style={[styles.dentistImage, { left: dentist.position.x - 25, top: dentist.position.y }]}
            />
          )}
          {/* Renderizar dulces */}
          {candies.map((candy, index) => (
            <Image
              key={index}
              source={candyImage}
              style={[styles.candy, { left: candy.position.x - 20, top: candy.position.y - 20 }]} // Ajustar posición
            />
          ))}
          {/* Botones para mover el dentista */}
          <View style={styles.controlPanel}>
            <TouchableOpacity style={styles.moveButton} onPress={() => moveDentist('left')}>
              <Text style={styles.buttonText}>Izquierda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moveButton} onPress={() => moveDentist('right')}>
              <Text style={styles.buttonText}>Derecha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shootButton} onPress={shootDentinta}>
              <Text style={styles.buttonText}>Disparar Dentinta</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
          <Icon name="play" size={20} color="#ffffff" />
          <Text style={styles.playButtonText}>Iniciar Juego</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3E5F8A',
    padding: 10,
    borderRadius: 5,
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  gameArea: {
    position: 'relative',
    width: '100%',
    height: '60%',
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 20,
    overflow: 'hidden',
  },
  dentistImage: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  candy: {
    position: 'absolute',
    width: 40,
    height: 40,
    // Cambia esto a la imagen de tu dulce
    resizeMode: 'contain',
  },
  controlPanel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moveButton: {
    backgroundColor: '#3E5F8A',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  shootButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default Juego;
