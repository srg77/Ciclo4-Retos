package com.Reto1.springboot.app.Controllers;

import java.util.List;
// import java.util.Optional;

import com.Reto1.springboot.app.Models.entities.User;
import com.Reto1.springboot.app.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
/**
 * Clase controladora de rutas para usuario
 */
public class UserController {

    @Autowired
    /**
    * objeto servicio
    */
    private UserService servicio;
  
    @GetMapping("/all")
    /**
    * mapeo para obtener la lista de usuarios
    */
    public List<User> getClients(){
        return servicio.getAll();
    }
    // @GetMapping("/{id}")
    // public Optional<User> getUser(@PathVariable("id") int userId) {
    //     return servicio.getUser(userId);
    // }
    @GetMapping("/{email}")
    /**
    * mapeo para obtener la validación de un email
    */
    public boolean getUser(@PathVariable("email") String userEmail) {
        return servicio.getValidationEmail(userEmail);
    }
    @GetMapping("/{email}/{password}")
    /**
    * mapeo para validar las credenciales de un usuario
    */
    public User getAccess(@PathVariable("email") String userEmail, @PathVariable("password") String userPassword) {
        return servicio.getValidationCredentials(userEmail, userPassword);
    }
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    /**
    * mapeo para registrar un nuevo usuario
    */
    public User save(@RequestBody User user) {
        return servicio.save(user);
    }

    
}
