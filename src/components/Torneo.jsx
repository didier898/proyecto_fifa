import React, { useState } from 'react';
import { shuffle } from 'lodash';
import './Torneo.css'; // Importa tus estilos personalizados aquí

const Torneo = () => {
  const [nombreTorneo, setNombreTorneo] = useState('');
  const [participantes, setParticipantes] = useState('');
  const [equipos, setEquipos] = useState('');
  const [sorteoRealizado, setSorteoRealizado] = useState(false);
  const [resultadosSorteo, setResultadosSorteo] = useState([]);
  const [torneoCreado, setTorneoCreado] = useState(false);
  const [llavesGeneradas, setLlavesGeneradas] = useState(false);
  const [llaves, setLlaves] = useState([]);
  const [ganadorRondaActual, setGanadorRondaActual] = useState({});
  const [ganadorAbsoluto, setGanadorAbsoluto] = useState('');

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
    setGanadorRondaActual({});
    setGanadorAbsoluto('');
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
      setGanadorRondaActual({});
      setGanadorAbsoluto('');
    } else {
      alert('Error: La cantidad de participantes debe ser igual a la cantidad de equipos.');
    }
  };

  const generarLlaves = () => {
    if (resultadosSorteo.length < 2) {
      alert('Error: Se necesitan al menos 2 participantes para generar las llaves.');
      return;
    }

    // Si hay un número impar de participantes, agregar un participante libre
    let participantesConLibre = [...resultadosSorteo];
    if (resultadosSorteo.length % 2 !== 0) {
      participantesConLibre.push({ participante: 'Libre', equipo: 'N/A' });
    }

    // Asegurarse de que el número de participantes sea par ahora
    if (participantesConLibre.length % 2 !== 0) {
      alert('Error: La cantidad de participantes debe ser par para generar las llaves.');
      return;
    }

    // Barajar los participantes
    const participantesAleatorios = shuffle([...participantesConLibre]);

    // Resto del código para generar las llaves igual que antes
    const enfrentamientos = [];
    for (let i = 0; i < participantesAleatorios.length; i += 2) {
      const enfrentamiento = {
        participanteA: participantesAleatorios[i].participante,
        equipoA: participantesAleatorios[i].equipo,
        participanteB: participantesAleatorios[i + 1].participante,
        equipoB: participantesAleatorios[i + 1].equipo,
        resultado: '',
      };
      enfrentamientos.push(enfrentamiento);
    }

    setLlaves(enfrentamientos);
    setLlavesGeneradas(true);
    setGanadorRondaActual({});
    setGanadorAbsoluto('');
  };

  const handleSeleccionarGanador = (enfrentamientoIndex, ganador) => {
    const nuevosGanadores = { ...ganadorRondaActual, [enfrentamientoIndex]: ganador };
    setGanadorRondaActual(nuevosGanadores);
  };

  const avanzarSiguienteRonda = () => {
    const ganadoresSiguienteRonda = [];
    for (let i = 0; i < llaves.length; i += 2) {
      const ganadorA = ganadorRondaActual[i];
      const ganadorB = ganadorRondaActual[i + 1];

      // Verificar si tenemos un ganador absoluto en esta ronda
      if (ganadorA && ganadorA === ganadorB) {
        setGanadorAbsoluto(ganadorA);
        return;
      }

      // Obtener los nombres de los participantes que pasaron a la siguiente ronda
      const participanteA = ganadorA ? llaves[i].participanteA : llaves[i + 1].participanteA;
      const equipoA = ganadorA ? llaves[i].equipoA : llaves[i + 1].equipoA;
      const participanteB = ganadorA ? llaves[i + 1].participanteA : llaves[i].participanteA;
      const equipoB = ganadorA ? llaves[i + 1].equipoA : llaves[i].equipoA;

      ganadoresSiguienteRonda.push({
        participanteA,
        equipoA,
        participanteB,
        equipoB,
        resultado: '',
      });
    }

    setLlaves(ganadoresSiguienteRonda);
    setGanadorRondaActual({});
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
      </section>

      <section>
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
            <button onClick={generarLlaves}>Generar Llaves</button>
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
                    <span className="participant">
                      {enfrentamiento.participanteA} ({enfrentamiento.equipoA})
                    </span>
                    <span className="vs">vs</span>
                    <span className="participant">
                      {enfrentamiento.participanteB} ({enfrentamiento.equipoB})
                    </span>
                    {enfrentamiento.resultado ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Marcador"
                          value={enfrentamiento.resultado}
                          onChange={(e) => handleActualizarEnfrentamiento(enfrentamientoIndex, e.target.value)}
                        />
                        <button onClick={() => handleActualizarEnfrentamiento(enfrentamientoIndex, '')}>
                          Borrar
                        </button>
                      </div>
                    ) : ganadorRondaActual[enfrentamientoIndex] ? (
                      <div className="winner">
                        Ganador: {ganadorRondaActual[enfrentamientoIndex]}
                      </div>
                    ) : ganadorAbsoluto ? (
                      <div className="winner">
                        Ganador Absoluto: {ganadorAbsoluto}
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => handleSeleccionarGanador(enfrentamientoIndex, enfrentamiento.participanteA)}>
                          {enfrentamiento.participanteA} - Seleccionar Ganador
                        </button>
                        <button onClick={() => handleSeleccionarGanador(enfrentamientoIndex, enfrentamiento.participanteB)}>
                          {enfrentamiento.participanteB} - Seleccionar Ganador
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {ganadorAbsoluto && <div className="winner">Ganador Absoluto: {ganadorAbsoluto}</div>}
              {!ganadorAbsoluto && <button onClick={avanzarSiguienteRonda}>Avanzar a la Siguiente Ronda</button>}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Torneo;
