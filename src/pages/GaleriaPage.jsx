// src/pages/GaleriaPage.jsx
import React, { useState } from 'react';
import Carrusel from '../components/Carrusel';
import Galeria from '../components/Galeria';
import ImagenExpandida from '../components/ImagenExpandida';
import { AiOutlineTable } from 'react-icons/ai';
import '../styles/GaleriaPage.css';

// Importar imágenes automáticamente
const importarImagenes = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

const GaleriaPage = () => {
  const todasLasImagenes = importarImagenes(require.context('../assets', false, /\.(png|jpe?g|svg)$/));
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  return (
    <div className="galeria-page">
      {/* Botón para ir a la tabla de datos */}
      <a href="/info" className="boton-tabla">
        <AiOutlineTable size={24} /> Ver Tabla de Datos
      </a>

      {/* Carrusel destacado */}
      <section className="carrusel-section">
        <h2>✨ Nuestras Mejores Colecciones ✨</h2>
        <Carrusel imagenes={todasLasImagenes} />
      </section>

      {/* Galería en cuadrícula */}
      <section className="galeria-section">
        <h2>🖼️ Galería Completa 🖼️</h2>
        <Galeria imagenes={todasLasImagenes} abrirImagen={setImagenSeleccionada} />
      </section>

      {/* Imagen expandida a pantalla completa */}
      {imagenSeleccionada && (
        <ImagenExpandida imagen={imagenSeleccionada} cerrarImagen={() => setImagenSeleccionada(null)} />
      )}
    </div>
  );
};

export default GaleriaPage;
