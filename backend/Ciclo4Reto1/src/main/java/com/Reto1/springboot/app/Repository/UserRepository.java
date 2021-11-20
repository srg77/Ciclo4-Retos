package com.Reto1.springboot.app.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.Reto1.springboot.app.CrudRepository.UserCrudRepository;
import com.Reto1.springboot.app.Models.entities.User;



@Repository
public class UserRepository {
	
	@Autowired
	UserCrudRepository userCrud;
	
	//1. Listar todos los usuarios
	public List<User> getAll(){
	        return (List<User>) userCrud.findAll();
	}
	//2. Buscar usuario en especifico
	public Optional<User> getUser(int id){
        return userCrud.findById(id);
    }
	//3. Registrar usuarios
	public User save(User p){
	        return userCrud.save(p);
	}
	 //3. Validar si existe email
	public Optional<User> validateEmail(String userEmail){
		return userCrud.validateEmail(userEmail);
	}
	 //3. Validar credenciales de acceso
	 public Optional<User> validateCredentials(String userEmail, String userPassword){
		return userCrud.validateCredentials(userEmail, userPassword);
	}
	 
}
