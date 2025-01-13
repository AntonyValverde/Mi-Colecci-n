// src/components/Galeria.jsx
import React from 'react';
import '../styles/Galeria.css';

const Galeria = ({ imagenes, abrirImagen }) => {
  return (
    <div className="galeria">
      {imagenes.map((imagen, index) => (
        <img
          key={index}
          src={imagen}
          alt={`Carrito ${index}`}
          onClick={() => abrirImagen(imagen)}
          className="imagen-miniatura"
        />
      ))}
    </div>
  );
};

export default Galeria;
