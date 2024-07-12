package edu.escuelaing.arsw.ASE.app;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador REST para manejar datos de clics del mouse.
 */
@CrossOrigin(origins = "*")
@RestController
public class AppController {

    private List<LocationPoint> clicks = new ArrayList<>();

    /**
     * Endpoint POST para agregar un nuevo objeto de clic del mouse a la lista.
     *
     * @param click Objeto LocationPoint recibido en el cuerpo de la solicitud.
     */
    @PostMapping("/clicks")
    public void addClick(@RequestBody LocationPoint click) {
        clicks.add(click);
    }

    /**
     * Endpoint GET para recuperar todos los clics del mouse registrados.
     *
     * @return Lista de objetos LocationPoint que contienen todos los clics registrados.
     */
    @GetMapping("/clicks")
    public List<LocationPoint> getClicks() {
        return new ArrayList<>(clicks);
    }

    /**
     * Endpoint DELETE para eliminar todos los clics del mouse registrados.
     */
    @DeleteMapping("/clicks")
    public void clearClicks() {
        clicks.clear();
    }
}
