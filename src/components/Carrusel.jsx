// src/components/Carrusel.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Carrusel.css';

const Carrusel = ({ imagenes }) => {
  const configuracion = {
    dots: true,               // Muestra los puntos de navegación
    infinite: true,           // Desplazamiento infinito
    speed: 500,               // Velocidad de transición
    slidesToShow: 3,          // Muestra 3 imágenes a la vez
    slidesToScroll: 1,        // Desplaza 1 imagen por vez
    autoplay: true,           // Desplazamiento automático
    autoplaySpeed: 2000,      // Tiempo entre desplazamientos (2 segundos)
    pauseOnHover: true,       // Pausa cuando el mouse está encima
    arrows: false             // Sin flechas de navegación
  };

  return (
    <div className="carrusel-container">
      <Slider {...configuracion}>
        {imagenes.map((imagen, index) => (
          <div key={index} className="carrusel-item">
            <img src={imagen} alt={`Carrito ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carrusel;
