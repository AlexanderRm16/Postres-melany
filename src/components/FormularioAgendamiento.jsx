import React, { useState } from 'react';
import './FormularioAgendamiento.css';

export const FormularioAgendamiento = ({ onSubmitPedido }) => {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    telefono: '',
    fechaEntrega: '',
    horaEntrega: '',
    notas: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmitPedido) {
      onSubmitPedido(formData);
    }
  };

  return (
    <form className="formulario-agendamiento" onSubmit={handleSubmit}>
      <h2 className="form-titulo">Agendar Pedido</h2>
      
      <div className="form-grupo">
        <label htmlFor="nombreCliente">Nombre Completo</label>
        <input
          type="text"
          id="nombreCliente"
          name="nombreCliente"
          value={formData.nombreCliente}
          onChange={handleChange}
          placeholder="Ej. Maria Pérez"
          required
        />
      </div>

      <div className="form-grupo">
        <label htmlFor="telefono">Teléfono / WhatsApp</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Ej. +57 300 000 0000"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-grupo">
          <label htmlFor="fechaEntrega">Fecha de Entrega</label>
          <input
            type="date"
            id="fechaEntrega"
            name="fechaEntrega"
            value={formData.fechaEntrega}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="horaEntrega">Hora aproximada</label>
          <input
            type="time"
            id="horaEntrega"
            name="horaEntrega"
            value={formData.horaEntrega}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-grupo">
        <label htmlFor="notas">Notas / Especificaciones</label>
        <textarea
          id="notas"
          name="notas"
          rows="3"
          value={formData.notas}
          onChange={handleChange}
          placeholder="Alergias, mensajes para el pastel, etc."
        ></textarea>
      </div>

      <button type="submit" className="btn-enviar">Confirmar Agendamiento</button>
    </form>
  );
};