import axios from 'axios';

// URL del backend
const url = 'https://proyectoclinicaback-back-production.up.railway.app/';
//const url = 'http://localhost:3000/';

// Servicio para obtener un usuario por email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${url}auth/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuario', error);
    throw error;
  }
};

// Servicio para crear un nuevo usuario
export const crearUsuario = async (userNew) => {
  try {
    const response = await axios.post(`${url}auth`, userNew);
    return response.data;
  } catch (error) {
    console.error('Error creando usuario', error);
    throw error;
  }
};

// Servicio para cambiar la contraseña
export const cambiarPassword = async (newPassword, email) => {
  try {
    const response = await axios.patch(`${url}auth/password/${email}`, newPassword);
    return response.data;
  } catch (error) {
    console.error('Error cambiando contraseña', error);
    throw error;
  }
};

// Servicio para verificar el email
export const checkEmail = async (dataEmail) => {
  try {
    const response = await axios.post(`${url}recuperar-pass`, dataEmail);
    return response.data;
  } catch (error) {
    console.error('Error verificando email', error);
    throw error;
  }
};

// Servicio para verificar respuesta
export const checkRespuesta = async (dataRespuesta) => {
  try {
    const response = await axios.post(`${url}recuperar-pass/check-respuesta`, dataRespuesta);
    return response.data;
  } catch (error) {
    console.error('Error verificando respuesta', error);
    throw error;
  }
};

// Servicio para obtener la pregunta
export const getPregunta = async (dataEmail) => {
  try {
    const response = await axios.post(`${url}recuperar-pass/check-question`, dataEmail);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo pregunta', error);
    throw error;
  }
};

// Servicio para enviar código al email
export const sendCode = async (email) => {
  try {
    const response = await axios.post(`${url}email`, { email });
    return response.data;
  } catch (error) {
    console.error('Error enviando código', error);
    throw error;
  }
};

// Servicio para validar usuario
export const validarUsuario = async (datos) => {
  try {
    const response = await axios.post(`${url}login`, datos);
    return response.data;
  } catch (error) {
    console.error('Error validando usuario', error);
    throw error;
  }
};

// Servicio para agregar una cita
export const addCita = async (data, id) => {
  try {
    const response = await axios.post(`${url}auth/citas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error agregando cita', error);
    throw error;
  }
};

// Servicio para obtener todas las citas por ID de usuario
export const getAllCitasByUserId = async (id) => {
  try {
    const response = await axios.get(`${url}auth/user/${id}/citas`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo citas', error);
    throw error;
  }
};

// Servicio para obtener una cita específica
export const getCita = async () => {
  try {
    const response = await axios.get(`${url}auth/cita/1`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo cita', error);
    throw error;
  }
};

// Servicio para obtener datos de usuario
export const getDataUser = async (id) => {
  try {
    const response = await axios.get(`${url}auth/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo datos de usuario', error);
    throw error;
  }
};

// Servicio para actualizar datos de usuario
export const updateUser = async (id, data) => {
  try {
    const response = await axios.patch(`${url}auth/perfil/${parseInt(id)}`, data);
    return response.data;
  } catch (error) {
    console.error('Error actualizando usuario', error);
    throw error;
  }
};

// Servicio para obtener información
export const getDataInformacion = async (id) => {
  try {
    const response = await axios.get(`${url}auth/informacion/1`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo información', error);
    throw error;
  }
};

// Servicio para actualizar información
export const updateInformacion = async (id, data) => {
  try {
    const response = await axios.patch(`${url}auth/informacion/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error actualizando información', error);
    throw error;
  }
};

// Servicio para obtener preguntas
export const getPreguntas = async () => {
  try {
    const response = await axios.get(`${url}auth/preguntas/1`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo preguntas', error);
    throw error;
  }
};

// Servicio para actualizar preguntas
export const updatePreguntas = async (id, data) => {
  try {
    const response = await axios.patch(`${url}auth/preguntas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error actualizando preguntas', error);
    throw error;
  }
};

// Servicio para eliminar una pregunta
export const deletePregunta = async (id) => {
  try {
    const response = await axios.delete(`${url}auth/preguntas/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando pregunta', error);
    throw error;
  }
};

// Servicio para crear preguntas
export const createPreguntas = async (createPreguntasDto) => {
  try {
    const response = await axios.post(`${url}auth/preguntas/`, createPreguntasDto);
    return response.data;
  } catch (error) {
    console.error('Error creando preguntas', error);
    throw error;
  }
};

// Servicio para obtener todos los usuarios
export const getAuth = async () => {
  try {
    const response = await axios.get(`${url}auth/`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo usuarios', error);
    throw error;
  }
};

// Servicio para eliminar un usuario
export const deleteUser = async (email) => {
  try {
    const response = await axios.delete(`${url}auth/user/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando usuario', error);
    throw error;
  }
};

// Servicio para obtener IP
export const getIp = async () => {
  try {
    const response = await axios.get('https://api.ipify.org/?format=json');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo IP', error);
    throw error;
  }
};

// Servicio para obtener servicios
export const getServicios = async () => {
  try {
    const response = await axios.get(`${url}auth/servicios/1`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo servicios', error);
    throw error;
  }
};

// Servicio para crear un nuevo servicio
export const createServicio = async (createServicioDto) => {
  try {
    const response = await axios.post(`${url}auth/servicios`, createServicioDto);
    return response.data;
  } catch (error) {
    console.error('Error creando servicio', error);
    throw error;
  }
};

// Servicio para encontrar un servicio por ID
export const findOneServicio = async (id) => {
  try {
    const response = await axios.get(`${url}auth/servicios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo servicio', error);
    throw error;
  }
};

// Servicio para actualizar un servicio
export const updateServicio = async (id, updateServicioDto) => {
  try {
    const response = await axios.patch(`${url}auth/servicios/${id}`, updateServicioDto);
    return response.data;
  } catch (error) {
    console.error('Error actualizando servicio', error);
    throw error;
  }
};

// Servicio para eliminar un servicio
export const removeServicio = async (id) => {
  try {
    const response = await axios.delete(`${url}auth/servicios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando servicio', error);
    throw error;
  }
};

// Servicio para obtener contacto
export const getContacto = async () => {
  try {
    const response = await axios.get(`${url}auth/contacto/1`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo contacto', error);
    throw error;
  }
};

// Servicio para eliminar contacto
export const deleteContacto = async (id) => {
  try {
    const response = await axios.delete(`${url}auth/contacto/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando contacto', error);
    throw error;
  }
};

// Servicio para crear un nuevo contacto
export const createContacto = async (createContactoDto) => {
  try {
    const response = await axios.post(`${url}auth/contacto/`, createContactoDto);
    return response.data;
  } catch (error) {
    console.error('Error creando contacto', error);
    throw error;
  }
};
