import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from './src/screens/Login';

describe('Pruebas de App y Login', () => {
    test('Verifica que el botón de inicio de sesión exista en Login', () => {
        const { getByText } = render(<Login />);
        expect(getByText('Iniciar Sesión')).toBeTruthy();
    });

    test('Ejecuta el evento handleLogin en el botón de inicio de sesión', async () => {
        const { getByText } = render(<Login />);
        const loginButton = getByText('Iniciar Sesión');
        fireEvent.press(loginButton);
        await waitFor(() => expect(loginButton).toBeTruthy());
    });

    test('Muestra el texto "Bienvenido" en la vista de Login', async () => {
        const { getByText } = render(<Login />);
        await waitFor(() => {
            expect(getByText('Bienvenido')).toBeTruthy();
        });
    });
});
