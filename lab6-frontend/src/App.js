import { useState } from 'react';
import TableroClicks from './TableroClicks';
import Action from './Action';
import axios from 'axios';

/**
 * Componente funcional que representa la aplicación principal.
 * Administra el estado de los clics usando hooks de React.
 */
function App() {
    // Variables de estado usando el hook useState
    const [clicks, setClicks] = useState([]);

    /**
     * Maneja el borrado del tablero enviando una solicitud DELETE al servidor.
     * Limpia el estado local de los clics después de una eliminación exitosa.
     */
    const handleClearBoard = () => {
        axios.delete('http://localhost:8080/clicks')
            .then(response => {
                console.log('Tablero limpiado');
                setClicks([]); // Limpiar los clics locales también
            })
            .catch(error => {
                console.error('Error limpiando el tablero:', error);
            });
    };

    return (
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
            {/* Componente para obtener acciones y actualizar el estado de clics */}
            <Action setActions={setClicks} />

            {/* Componente para renderizar el tablero con los clics actuales */}
            <TableroClicks clicks={clicks} />

            {/* Botón para limpiar el tablero */}
            <button
                onClick={handleClearBoard}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#ff0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer'
                }}
            >
                Limpiar Tablero
            </button>
        </div>
    );
}

export default App;


