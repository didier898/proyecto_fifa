import React, { useState } from 'react';


const Torneo = () => {
    const [nombreTorneo, setNombreTorneo] = useState('');
  
    const handleNombreChange = (event) => {
      setNombreTorneo(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Aquí podrías realizar alguna acción con el nombre del torneo, como guardarlo en la base de datos o realizar otros cálculos relacionados con el torneo.
      alert(`¡Torneo "${nombreTorneo}" creado correctamente!`);
      setNombreTorneo(''); // Reiniciamos el campo del formulario después de enviarlo.
    };
  
    return (
      <div>
        <h1>Torneo</h1>
        <section>
          <h2>Crear Nuevo Torneo</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nombre del Torneo:
              <input type="text" value={nombreTorneo} onChange={handleNombreChange} />
            </label>
            <button type="submit">Crear Torneo</button>
          </form>
        </section>
      </div>
    );
  };
  
  export default Torneo;
  