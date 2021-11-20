package com.Reto1.springboot.app.CrudRepository;


import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.Reto1.springboot.app.Models.entities.User;


public interface UserCrudRepository extends CrudRepository<User, Integer>{
	
	@Query("Select u FROM User u where u.email=?1")
	public Optional<User> validateEmail(String email);

	@Query("Select u FROM User u where u.email=?1 and u.password=?2")
	public Optional<User> validateCredentials(String email, String password);
		
}
