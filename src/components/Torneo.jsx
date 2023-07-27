import React, { useState } from 'react';
import { shuffle } from 'lodash';

const Torneo = () => {
  const [nombreTorneo, setNombreTorneo] = useState('');
  const [participantes, setParticipantes] = useState('');
  const [equipos, setEquipos] = useState('');
  const [sorteoRealizado, setSorteoRealizado] = useState(false);
  const [resultadosSorteo, setResultadosSorteo] = useState([]);
  const [torneoCreado, setTorneoCreado] = useState(false);

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

  return (
    <div>
      <h1>Torneo</h1>

      {!sorteoRealizado && (
        <section>
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
        </section>
      )}

      <section>
        <h2>Sorteo de Equipos</h2>
        {!sorteoRealizado && (
          <div>
            <label>
              Ingrese los nombres de los participantes (separados por comas):
              <input type="text" value={participantes} onChange={handleParticipantesChange} />
            </label>
          </div>
        )}
        {!sorteoRealizado && (
          <div>
            <label>
              Ingrese los nombres de los equipos (separados por comas):
              <input type="text" value={equipos} onChange={handleEquiposChange} />
            </label>
          </div>
        )}
        {!sorteoRealizado && (
          <div>
            <button onClick={handleSortearEquipos}>Sortear</button>
          </div>
        )}
      </section>

      {sorteoRealizado && (
        <section>
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
        </section>
      )}
    </div>
  );
};

export default Torneo;
