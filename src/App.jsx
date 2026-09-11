import { useState, useEffect } from 'react';
import { obtenerPostres, crearPedido } from './services/api_pedido';

function App() {
  const [postres, setPostres] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      const data = await obtenerPostres();
      setPostres(data);
      setCargando(false);
    };
    cargarDatos();
  }, []);

  const handleAgregarPedido = async (nuevoPedido) => {
    const res = await crearPedido(nuevoPedido);
    if (res) {
      setPedidos((prev) => [...prev, res.datos || nuevoPedido]);
      alert('¡Pedido registrado!');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🍰 Tienda de Postres</h1>

      {cargando ? (
        <p>Cargando menú...</p>
      ) : (
        <section>
          <h2>Menú Disponible</h2>
          <ul>
            {postres.map((p) => (
              <li key={p.id}>
                <strong>{p.nombre}</strong> - ${p.precio}
                <p>{p.descripcion}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <hr />

      <section>
        <h2>Pedidos Realizados</h2>
        {pedidos.length === 0 ? (
          <p>Aún no hay pedidos.</p>
        ) : (
          <ul>
            {pedidos.map((ped, index) => (
              <li key={index}>{JSON.stringify(ped)}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;