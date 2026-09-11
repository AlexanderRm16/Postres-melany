import React from 'react';
import { TarjetaPostre } from '../TarjetaPostre/TarjetaPostre';
import './ListaPedidos.css';

export const ListaProductos = ({ productos, onSeleccionarProducto }) => {
  if (!productos || productos.length === 0) {
    return <p className="lista-vacia">No hay productos disponibles por el momento.</p>;
  }

  return (
    <section className="lista-productos-contenedor">
      <h2 className="lista-titulo">Nuestros Postres</h2>
      <div className="grilla-productos">
        {productos.map((postre) => (
          <TarjetaPostre 
            key={postre.id} 
            postre={postre} 
            onSeleccionar={onSeleccionarProducto} 
          />
        ))}
      </div>
    </section>
  );
};