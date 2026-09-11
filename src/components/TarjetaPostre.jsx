import React from 'react';
import './TarjetaPostre.css';

export const TarjetaPostre = ({ postre, onSeleccionar }) => {
  const { nombre, descripcion, precio, imagen, disponible } = postre;

  return (
    <div className={`tarjeta-postre ${!disponible ? 'agotado' : ''}`}>
      <div className="tarjeta-imagen-container">
        <img src={imagen} alt={nombre} className="tarjeta-imagen" />
        {!disponible && <span className="badge-agotado">Agotado</span>}
      </div>
      <div className="tarjeta-cuerpo">
        <h3 className="tarjeta-titulo">{nombre}</h3>
        <p className="tarjeta-descripcion">{descripcion}</p>
        <div className="tarjeta-pie">
          <span className="tarjeta-precio">${precio.toLocaleString()}</span>
          <button 
            className="btn-agregar" 
            disabled={!disponible}
            onClick={() => onSeleccionar(postre)}
          >
            {disponible ? 'Añadir al pedido' : 'No disponible'}
          </button>
        </div>
      </div>
    </div>
  );
};