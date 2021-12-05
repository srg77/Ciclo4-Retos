package com.example.reto2.Controllers;

import java.util.List;
import java.util.Optional;


import com.example.reto2.Models.Documents.User;
import com.example.reto2.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;




@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
/**
 * Clase controladora de rutas
 */
public class UserController {

	@Autowired
	/**
	* instacia de servicio a usar
	*/
	private UserService service;

	@GetMapping("/all")
	/**
	* método para listar todos los usuarios
	*/
	public List<User> getAll() {
		return service.getUsers();
	}

	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/new")
	/**
	* método para agregar usuarios
	*/
	public User create(@RequestBody User usuario) {
		return service.save(usuario);
	}

	@GetMapping("/emailexist/{email}")
	/**
	* método para validar email de usuario
	*/
	public boolean findEmail(@PathVariable("email") String userEmail) {
		return service.getValidationEmail(userEmail);
	}

	@GetMapping("/{email}/{password}")
	/**
	* método para validar credenciales de usuario
	*/
	public User getAccess(@PathVariable("email") String userEmail, @PathVariable("password") String userPassword) {
		return service.getValidationCredentials(userEmail, userPassword);
	}
	

	@PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
	/**
	* método para actualizar un usuario
	*/
    public User update(@RequestBody User usuario) {
        return service.save(usuario);
    }
	
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
	/**
	* método para eliminar usuario
	*/
    public boolean delete(@PathVariable("id") Integer userId) {
        return service.deleteUser(userId);
    }
    
    @GetMapping("/{id}")
    public Optional<User> getAdmin(@PathVariable("id") int userid) {
        return service.getUser(userid);
    }

	

}
