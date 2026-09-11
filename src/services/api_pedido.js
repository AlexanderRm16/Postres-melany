// URL del backend (la cambias cuando el grupo de backend la tenga lista)
const API_URL = 'http://localhost:5000/api';

// Datos de prueba (MOCK) para avanzar sin esperar al backend
const POSTRES_MOCK = [
  { id: 1, nombre: 'Tarta de Fresa', precio: 12000, descripcion: 'Deliciosa tarta con crema pastelera y fresas.' },
  { id: 2, nombre: 'Cheesecake de Frutos Rojos', precio: 15000, descripcion: 'Base de galleta con crema de queso y mermelada.' },
  { id: 3, nombre: 'Brownie con Helado', precio: 10000, descripcion: 'Brownie tibio de chocolate con helado de vainilla.' }
];

// Obtener la lista de postres
export const obtenerPostres = async () => {
  try {
    const response = await fetch(`${API_URL}/postres`);
    if (!response.ok) throw new Error('Error al conectar');
    return await response.json();
  } catch (error) {
    console.warn('Usando datos de prueba (MOCK):', error.message);
    return POSTRES_MOCK;
  }
};

// Enviar un nuevo pedido
export const crearPedido = async (datosPedido) => {
  try {
    const response = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosPedido)
    });
    if (!response.ok) throw new Error('Error al enviar pedido');
    return await response.json();
  } catch (error) {
    console.warn('Simulando envío exitoso:', error.message);
    return { exito: true, datos: datosPedido };
  }
};