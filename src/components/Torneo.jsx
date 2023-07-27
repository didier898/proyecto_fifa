import React, { useState } from 'react';
import { shuffle } from 'lodash';

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
    } else {
      alert('Error: La cantidad de participantes debe ser igual a la cantidad de equipos.');
    }
  };

  const handleSortearLlaves = () => {
    if (resultadosSorteo.length === 0) {
      alert('Primero debe realizar el sorteo de equipos.');
      return;
    }

    const participantesAleatorios = shuffle([...resultadosSorteo]);
    const nuevasLlaves = [];
    for (let i = 0; i < participantesAleatorios.length; i += 2) {
      if (i + 1 < participantesAleatorios.length) {
        nuevasLlaves.push({
          enfrentamiento: `${participantesAleatorios[i].participante}, equipo ${participantesAleatorios[i].equipo} vs ${participantesAleatorios[i + 1].participante}, equipo ${participantesAleatorios[i + 1].equipo}`,
        });
      } else {
        // Participante sin pareja, pasa directamente a la siguiente fase
        nuevasLlaves.push({
          enfrentamiento: `${participantesAleatorios[i].participante}, equipo ${participantesAleatorios[i].equipo} (Pasa automáticamente a la siguiente fase)`,
        });
      }
    }
    setLlaves(nuevasLlaves);
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
              <button onClick={handleSortearLlaves}>Sortear y Mostrar Llaves</button>
            </div>
          </div>
        )}
      </section>

      <section>
        {llavesGeneradas && (
          <div>
            <h2>Llaves del Torneo</h2>
            <ul>
              {llaves.map((llave, index) => (
                <li key={index}>{llave.enfrentamiento}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default Torneo;

