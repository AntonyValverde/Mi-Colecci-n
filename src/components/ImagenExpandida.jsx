// src/components/ImagenExpandida.jsx
import React from 'react';
import '../styles/ImagenExpandida.css';

const ImagenExpandida = ({ imagen, cerrarImagen }) => {
  return (
    <div className="overlay" onClick={cerrarImagen}>
      <img src={imagen} alt="Imagen ampliada" className="imagen-grande" />
    </div>
  );
};

export default ImagenExpandida;
