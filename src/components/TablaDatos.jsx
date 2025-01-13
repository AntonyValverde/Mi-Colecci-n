import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AiOutlinePlusCircle, AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import '../styles/TablaDatos.css';

const TablaDatos = () => {
  const [datos, setDatos] = useState([]);
  const [tiposDesplegados, setTiposDesplegados] = useState({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busquedaTipo, setBusquedaTipo] = useState('');
  const navigate = useNavigate();

  // Estados para el formulario del modal
  const [nuevoTipo, setNuevoTipo] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoNumero, setNuevoNumero] = useState('');

  // Obtener datos desde Firebase
  const obtenerDatos = async () => {
    const querySnapshot = await getDocs(collection(db, "Cars"));
    const listaDatos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDatos(listaDatos);
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  // Agrupar por tipo
  const agruparPorTipo = () => {
    const agrupado = {};
    datos.forEach((item) => {
      if (!agrupado[item.tipo]) {
        agrupado[item.tipo] = [];
      }
      agrupado[item.tipo].push(item);
    });
    return agrupado;
  };

  const datosAgrupados = agruparPorTipo();

  const toggleDesplegar = (tipo) => {
    setTiposDesplegados((prev) => ({
      ...prev,
      [tipo]: !prev[tipo],
    }));
  };

  // Agregar nuevo dato a Firebase
  const agregarDato = async () => {
    if (nuevoTipo && nuevoNombre && nuevoNumero) {
      try {
        await addDoc(collection(db, "Cars"), {
          tipo: nuevoTipo,
          nombre: nuevoNombre,
          numero: nuevoNumero,
          umd: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` // Generar UMD único
        });
        obtenerDatos();
        setMostrarModal(false);
        setNuevoTipo('');
        setNuevoNombre('');
        setNuevoNumero('');
      } catch (error) {
        console.error("Error al agregar el documento: ", error);
      }
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  // Filtrar datos en tiempo real por tipo
  const datosFiltrados = datos.filter((item) =>
    item.tipo.toLowerCase().includes(busquedaTipo.toLowerCase())
  );

  const totalRegistros = datosFiltrados.length;

  return (
    <div className="tabla-container">
      {/* Botón de volver a la página de galería */}
      <button className="boton-volver" onClick={() => navigate('/')}>
        <AiOutlineArrowLeft size={20} />
      </button>

      {/* Contenedor del buscador y botón de agregar */}
      <div className="contenedor-buscador">
        <input
          type="text"
          placeholder="Buscar por tipo..."
          value={busquedaTipo}
          onChange={(e) => setBusquedaTipo(e.target.value)}
          className="buscador-tipo"
        />

        <button className="boton-agregar" onClick={() => setMostrarModal(true)}>
          <AiOutlinePlusCircle size={24} />
        </button>
      </div>

      {/* Tabla de datos */}
      <table className="tabla-datos">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(agruparPorTipo())
            .filter((tipo) => tipo.toLowerCase().includes(busquedaTipo.toLowerCase()))
            .map((tipo) => (
              <React.Fragment key={tipo}>
                <tr>
                  <td onClick={() => toggleDesplegar(tipo)} className="tipo-columna">
                    {tipo} {tiposDesplegados[tipo] ? '▲' : '▼'}
                  </td>
                  <td>{datosAgrupados[tipo].length}</td>
                </tr>

                {tiposDesplegados[tipo] &&
                  datosAgrupados[tipo].map((item) => (
                    <tr key={item.id} className="detalle-fila">
                      <td colSpan="2">
                        <strong>Nombre:</strong> {item.nombre} | <strong>Número:</strong> {item.numero}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
        </tbody>
      </table>

      {/* Total de registros */}
      <div className="total-registros">
        <strong>Total de registros:</strong> {totalRegistros}
      </div>

      {/* Modal para agregar datos */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar Nuevo Carro</h2>
            <input
              type="text"
              placeholder="Tipo"
              value={nuevoTipo}
              onChange={(e) => setNuevoTipo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Número"
              value={nuevoNumero}
              onChange={(e) => setNuevoNumero(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={agregarDato}>Agregar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaDatos;
