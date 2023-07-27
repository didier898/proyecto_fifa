import React, { useState } from 'react';
import { shuffle } from 'lodash';
import './Torneo.css'; // Importa tus estilos personalizados aquí
import './Estilo.css';

const Torneo = () => {
  const [nombreTorneo, setNombreTorneo] = useState('');
  const [participantes, setParticipantes] = useState('');
  const [equipos, setEquipos] = useState('');
  const [sorteoRealizado, setSorteoRealizado] = useState(false);
  const [resultadosSorteo, setResultadosSorteo] = useState([]);
  const [torneoCreado, setTorneoCreado] = useState(false);
  const [llavesGeneradas, setLlavesGeneradas] = useState(false);
  const [llaves, setLlaves] = useState([]);

  const handleNombreTorneoChange = (event) => {
    setNombreTorneo(event.target.value);
  };

  const handleParticipantesChange = (event) => {
    setParticipantes(event.target.value);
  };

  const handleEquiposChange = (event) => {
    setEquipos(event.target.value);
  };

  const handleCrearTorneo = () => {
    setTorneoCreado(true);
    setSorteoRealizado(false);
    setResultadosSorteo([]);
    setLlavesGeneradas(false);
    setLlaves([]);
  };

  const handleSortearEquipos = () => {
    const participantesArray = participantes.split(',').map((participante) => participante.trim());
    const equiposArray = equipos.split(',').map((equipo) => equipo.trim());

    if (participantesArray.length === equiposArray.length) {
      const participantesAleatorios = shuffle([...participantesArray]);
      const resultados = participantesAleatorios.map((participante, index) => ({
        participante,
        equipo: equiposArray[index],
      }));
      setResultadosSorteo(resultados);
      setSorteoRealizado(true);
      setLlavesGeneradas(false);
      setLlaves([]);
    } else {
      alert('Error: La cantidad de participantes debe ser igual a la cantidad de equipos.');
    }
  };

  const generarLlaves = () => {
    const enfrentamientos = [];

    // Asegurarse de que hay al menos 2 participantes
    if (resultadosSorteo.length < 2) {
      alert('Error: Se necesitan al menos 2 participantes para generar las llaves.');
      return;
    }

    // Obtener una copia de los resultados del sorteo y barajarlos
    const participantesAleatorios = shuffle([...resultadosSorteo]);

    // Agrupar los participantes en enfrentamientos
    for (let i = 0; i < participantesAleatorios.length; i += 2) {
      const enfrentamiento = {
        participanteA: participantesAleatorios[i].participante,
        equipoA: participantesAleatorios[i].equipo,
        participanteB: participantesAleatorios[i + 1].participante,
        equipoB: participantesAleatorios[i + 1].equipo,
      };
      enfrentamientos.push(enfrentamiento);
    }

    // Guardar las llaves generadas en el estado y marcar llavesGeneradas como true
    setLlaves(enfrentamientos);
    setLlavesGeneradas(true);
  };

  return (
    <div>
      <h1>Torneo</h1>

      <section>
        {!sorteoRealizado && !llavesGeneradas && (
          <div>
            <h2>Crear Nuevo Torneo</h2>
            <div>
              <label>
                Nombre del Torneo:
                <input type="text" value={nombreTorneo} onChange={handleNombreTorneoChange} />
              </label>
            </div>
            <div>
              <button onClick={handleCrearTorneo}>Crear Torneo</button>
              {torneoCreado && <span> - Torneo creado correctamente</span>}
            </div>
          </div>
        )}
      </section>

      <section>
        {torneoCreado && !sorteoRealizado && !llavesGeneradas && (
          <div>
            <h2>Sorteo de Equipos</h2>
            <div>
              <label>
                Ingrese los nombres de los participantes (separados por comas):
                <input type="text" value={participantes} onChange={handleParticipantesChange} />
              </label>
            </div>
            <div>
              <label>
                Ingrese los nombres de los equipos (separados por comas):
                <input type="text" value={equipos} onChange={handleEquiposChange} />
              </label>
            </div>
            <div>
              <button onClick={handleSortearEquipos}>Sortear</button>
            </div>
          </div>
        )}

        {sorteoRealizado && !llavesGeneradas && (
          <div>
            <h2>Resultados del Sorteo</h2>
            <p>Torneo: {nombreTorneo}</p>
            <table>
              <thead>
                <tr>
                  <th>Participante</th>
                  <th>Equipo Asignado</th>
                </tr>
              </thead>
              <tbody>
                {resultadosSorteo.map((resultado, index) => (
                  <tr key={index}>
                    <td>{resultado.participante}</td>
                    <td>{resultado.equipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={generarLlaves}>Generar Llaves</button>
            </div>
          </div>
        )}
      </section>

      <section>
        {llavesGeneradas && (
          <div>
            <h2>Llaves del Torneo</h2>
            <div className="bracket">
              {llaves.map((enfrentamiento, enfrentamientoIndex) => (
                <div key={enfrentamientoIndex} className="round">
                  <div className="match">
                    <span className="participant">{enfrentamiento.participanteA}</span>
                    <span className="vs">vs</span>
                    <span className="participant">{enfrentamiento.participanteB}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Torneo;
