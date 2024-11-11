import 'react-native-gesture-handler'; 
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'; 
import { StripeProvider } from '@stripe/stripe-react-native'; 

import Home from './src/screens/Home';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Recuperar from './src/screens/Recuperar';
import Perfil from './src/screens/Perfil';
import Historial from './src/screens/Historial';
import Agendar from './src/screens/Agendar';
import EditarPerfil from './src/screens/Editar Perfil';
import QuienesSomos from './src/screens/Quienes Somos';
import AvisoPrivacidad from './src/screens/Aviso de Privacidad';
import Juego from './src/screens/juego';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Historial') {
            iconName = 'history';
          } else if (route.name === 'Perfil') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#283e51', 
          borderTopWidth: 0,
          height: 70, 
          paddingBottom: 10, 
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#a4c2d6', 
        tabBarLabelStyle: {
          fontSize: 14, 
        },
      })}
    >
      <Tab.Screen name="Historial" component={Historial} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Tab.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

const HeaderMenu = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  return (
    <View style={{ marginRight: 25 }}>
    <Menu
      visible={visible}
      anchor={
        <TouchableOpacity onPress={showMenu}>
          <Icon name="bars" size={25} color="#ffffff" />
        </TouchableOpacity>
      }
      onRequestClose={hideMenu}
    >
      <MenuItem onPress={() => { hideMenu(); navigation.navigate('QuienesSomos'); }}>Quienes Somos</MenuItem>
      <MenuItem onPress={() => { hideMenu(); navigation.navigate('AvisoPrivacidad'); }}>Privacidad</MenuItem>
      <MenuItem onPress={() => { hideMenu(); navigation.navigate('Juego'); }}>Juego</MenuItem>



      <MenuDivider />
      <MenuItem 
          onPress={() => { 
            hideMenu();
            navigation.replace('Login'); 
          }}
        >
          <Icon name="sign-out" size={16} color="#000" style={{ marginRight: 10 }} /> 
          Cerrar sesión
        </MenuItem>
      </Menu>
    </View>
  );
};

const App = () => {
  return (
    <StripeProvider publishableKey="pk_live_51Q6pB6DH8ROWHZGsipaA0YAtG48ZdPrv3nr5lGifryHtc9eGwHXljElbSSuByNlCv5NWZN8k4e4r5wn72XqSb9nZ00SKe6czkj">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Recuperar" component={Recuperar} />

          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.navigate('Home')}>
                  <Image
                    source={require('./assets/logoblanco.png')} 
                    style={{ width: 95, height: 80 }} 
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ),
              headerRight: () => <HeaderMenu navigation={navigation} />,
              headerTitle: '',
              headerTitleStyle: {
                color: '#ffffff', 
              },
              headerStyle: {
                backgroundColor: '#283e51', 
                elevation: 0,
                shadowOpacity: 0,
              },
            })}
          />

<Stack.Screen 
            name="Agendar" 
            component={Agendar} 
            options={{
              headerTitle: 'Agendar',
              headerTitleStyle: {
                color: '#ffffff',
              },
              headerStyle: {
                backgroundColor: '#283e51', 
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#ffffff', 
            }}
          />

          <Stack.Screen 
            name="Editar Perfil" 
            component={EditarPerfil} 
            options={{
              headerTitle: 'Editar perfil',
              headerTitleStyle: {
                color: '#ffffff',
              },
              headerStyle: {
                backgroundColor: '#283e51', 
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#ffffff', 
            }}
          />
  
          <Stack.Screen
            name="QuienesSomos"
            component={QuienesSomos}
            options={{
              title: 'Quienes Somos',
              headerTitleStyle: {
                color: '#ffffff',
              },
              headerStyle: {
                backgroundColor: '#283e51', // Main color for header
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#ffffff', // White color for back button
            }}
          />

          <Stack.Screen
            name="AvisoPrivacidad"
            component={AvisoPrivacidad}
            options={{
              title: 'Aviso de Privacidad',
              headerTitleStyle: {
                color: '#ffffff',
              },
              headerStyle: {
                backgroundColor: '#283e51', 
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#ffffff', 
            }}
          />

        <Stack.Screen
            name="Juego"
            component={Juego}
            options={{
              title: 'Juego',
              headerTitleStyle: {
                color: '#ffffff',
              },
              headerStyle: {
                backgroundColor: '#283e51', 
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: '#ffffff', 
            }}
          />
        </Stack.Navigator>


      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
