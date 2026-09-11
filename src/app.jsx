import { useState, useEffect } from 'react';
import { obtenerPostres, crearPedido } from './services/api_pedido';
import TarjetaPostre from './components/TarjetaPostre';
import FormularioAgendamiento from './components/FormularioAgendamiento';
import listaPedidos from './components/listaPedidos';

function App() {
  const [postres, setPostres] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mensajeEstado, setMensajeEstado] = useState('');
  const [cargando, setCargando] = useState(false);

  // Cargar el catálogo de postres desde el servicio al montar el componente
  useEffect(() => {
    setCargando(true);
    obtenerPostres()
      .then((data) => {
        setPostres(data);
      })
      .catch((error) => {
        console.error('Error al cargar postres:', error);
        setMensajeEstado('Ocurrió un error al cargar el catálogo de postres.');
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  // Agregar un postre seleccionado al carrito
  const agregarAlCarrito = (postre) => {
    setCarrito((prevCarrito) => [...prevCarrito, postre]);
  };

  // Vaciar el carrito de compras
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // Manejar el envío del formulario de pedido hacia la API
  const manejarEnvioPedido = async (datosCliente) => {
    if (carrito.length === 0) {
      setMensajeEstado('El carrito está vacío. Agrega al menos un postre.');
      return;
    }

    setCargando(true);
    setMensajeEstado('');

    try {
      const nuevoPedido = {
        cliente: datosCliente,
        items: carrito,
        fecha: new Date().toISOString()
      };

      const respuesta = await crearPedido(nuevoPedido);
      
      if (respuesta) {
        setMensajeEstado('¡Pedido realizado con éxito!');
        setCarrito([]); // Limpiar el carrito tras completar el pedido
      }
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      setMensajeEstado('No se pudo procesar el pedido. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="app-container" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAline: 'center', marginBottom: '30px' }}>
        <h1>Venta de Postres</h1>
      </header>

      {mensajeEstado && (
        <div 
          className="alerta" 
          style={{ 
            padding: '10px', 
            marginBottom: '20px', 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            borderRadius: '4px' 
          }}
        >
          {mensajeEstado}
        </div>
      )}

      {cargando && <p>Cargando información...</p>}

      <main style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Sección de Catálogo de Postres */}
        <section className="catalogo-section">
          <h2>Catálogo de Postres</h2>
          <div 
            className="grid-postres" 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}
          >
            {postres.map((postre) => (
              <TarjetaPostre
                key={postre.id || postre.nombre}
                postre={postre}
                alAgregar={agregarAlCarrito}
              />
            ))}
          </div>
        </section>

        {/* Sección de Carrito y Formulario de Agendamiento */}
        <section className="pedido-section">
          <h2>Tu Pedido</h2>
          
          <div className="resumen-carrito" style={{ marginBottom: '20px' }}>
            <h3>Carrito ({carrito.length} ítems)</h3>
            {carrito.length === 0 ? (
              <p>No has seleccionado postres.</p>
            ) : (
              <ul>
                {carrito.map((item, index) => (
                  <li key={index}>
                    {item.nombre} - ${item.precio}
                  </li>
                ))}
              </ul>
            )}
            {carrito.length > 0 && (
              <button onClick={limpiarCarrito} style={{ marginTop: '10px' }}>
                Vaciar Carrito
              </button>
            )}
          </div>

          <hr />

          <FormularioAgendamiento
            carrito={carrito}
            alEnviar={manejarEnvioPedido}
            deshabilitado={cargando}
          />
        </section>
      </main>
    </div>
  );
}

export default App;