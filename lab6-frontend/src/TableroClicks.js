import React, { useRef, useEffect, useCallback } from 'react';
import p5 from 'p5';
import axios from 'axios';

/**
 * Componente funcional que representa un área de dibujo usando p5.js.
 * Maneja el dibujo de clics y su envío al servidor.
 *
 * @param {Object} props - Objeto de props que contiene los clics.
 */
function TableroClicks({ clicks }) {
    const containerRef = useRef(null);
    const p5InstanceRef = useRef(null);

    /**
     * Función de sketch de p5.js que define el comportamiento de setup y draw.
     *
     * @param {p5} p - Instancia de p5.js pasada por la biblioteca p5.js.
     */
    const sketch = useCallback((p) => {
        p.setup = () => {
            p.createCanvas(500, 500);
            p.background(255); // Inicializar con fondo blanco
        };

        p.draw = () => {
            if (p.mouseIsPressed) {
                const click = { x: p.mouseX, y: p.mouseY };
                axios.post('http://localhost:8080/clicks', click)
                    .then(response => {
                        console.log('Clic registrado:', response.data);
                    })
                    .catch(error => {
                        console.error('Error registrando clic:', error);
                    });
                drawClick(p, click);
            }
        };
    }, []);

    /**
     * Dibuja un clic (elipse) en el tablero usando funciones de p5.js.
     *
     * @param {p5} p - Instancia de p5.js pasada por la biblioteca p5.js.
     * @param {Object} click - Objeto clic que contiene las coordenadas.
     */
    const drawClick = (p, click) => {
        p.fill('#000000'); // Color negro para los clics
        p.noStroke(); // Deshabilitar el borde
        p.ellipse(click.x, click.y, 10, 10);
    };

    /**
     * Hook de efecto para inicializar y limpiar la instancia de p5.js.
     */
    useEffect(() => {
        if (containerRef.current && !p5InstanceRef.current) {
            p5InstanceRef.current = new p5(sketch, containerRef.current);
        }

        return () => {
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
                p5InstanceRef.current = null; // Limpiar la referencia
            }
        };
    }, [containerRef, sketch]);

    /**
     * Hook de efecto para redibujar el tablero cuando cambia el array de clics.
     */
    useEffect(() => {
        if (p5InstanceRef.current && p5InstanceRef.current.canvas) {
            p5InstanceRef.current.background(255); // Limpiar el canvas con color blanco
            clicks.forEach(click => drawClick(p5InstanceRef.current, click));
        }
    }, [clicks]);

    return <div ref={containerRef} id="container"></div>;
}

export default TableroClicks;
