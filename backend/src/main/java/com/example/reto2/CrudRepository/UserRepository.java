package com.example.reto2.CrudRepository;

import java.util.List;
// import java.util.List;
import java.util.Optional;

import com.example.reto2.Models.Documents.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


/**
 * interfaz para uso de crud sobre base de datos mongo
 */
public interface UserRepository extends MongoRepository<User, Integer>{
	
	/**
	 * método para hallar usuario por email
	 */
	@Query("{email:?0}")
	Optional<User> getEmail(String email);
	/**
	 * método para comprobar usuario por credenciales
	 */
	@Query("{email:?0, password:?1}")
	Optional<User> getEmailAndPassword(String email, String pass);
	/**
	 * método para hallar usuarios por mes de cumpleaños
	 */
	List<User> findByMonthBirthtDay(String monthBirthtDay);
	
	
}