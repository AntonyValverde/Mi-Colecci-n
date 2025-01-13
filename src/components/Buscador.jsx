// src/components/Buscador.jsx
import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import '../styles/Buscador.css';

const Buscador = ({ filtro, setFiltro }) => {
  const navigate = useNavigate();

  return (
    <div className="buscador-container">
      <input
        type="text"
        placeholder="Buscar carritos..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="buscador-input"
      />
      <button onClick={() => navigate('/info')} className="info-button">
        <AiOutlineInfoCircle size={20} />
      </button>
    </div>
  );
};

export default Buscador;
