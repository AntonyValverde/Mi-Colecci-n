// src/pages/GaleriaPage.jsx
import React, { useState } from 'react';
import Buscador from '../components/Buscador';
import Carrusel from '../components/Carrusel';
import Galeria from '../components/Galeria';
import ImagenExpandida from '../components/ImagenExpandida';
import '../styles/App.css';

// Función para importar todas las imágenes automáticamente
const importarImagenes = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

const GaleriaPage = () => {
  const todasLasImagenes = importarImagenes(require.context('../assets', false, /\.(png|jpe?g|svg)$/));
  const [filtro, setFiltro] = useState('');
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  // Filtrar imágenes según el texto ingresado en el buscador
  const imagenesFiltradas = todasLasImagenes.filter((img) =>
    img.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="galeria-page">
      {/* Buscador con botón de información */}
      <Buscador filtro={filtro} setFiltro={setFiltro} />

      {/* Carrusel atractivo con desplazamiento automático */}
      <Carrusel imagenes={imagenesFiltradas} />

      {/* Galería de imágenes en filas y columnas */}
      <Galeria imagenes={imagenesFiltradas} abrirImagen={setImagenSeleccionada} />

      {/* Imagen expandida a pantalla completa */}
      {imagenSeleccionada && (
        <ImagenExpandida imagen={imagenSeleccionada} cerrarImagen={() => setImagenSeleccionada(null)} />
      )}
    </div>
  );
};

export default GaleriaPage;
