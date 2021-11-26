package com.example.reto2.CrudRepository;

import java.util.Optional;

import com.example.reto2.Models.Documents.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;



public interface UserRepository extends MongoRepository<User, Integer>{
	
	@Query("{email:?0}")
	Optional<User> getEmail(String email);
	
	@Query("{email:?0, password:?1}")
	Optional<User> getEmailAndPassword(String email, String pass);
	
}