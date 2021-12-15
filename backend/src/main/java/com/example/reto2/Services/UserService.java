package com.example.reto2.Services;

import java.util.List;
import java.util.Optional;
import com.example.reto2.CrudRepository.UserRepository;
import com.example.reto2.Models.Documents.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Clase servicios sobre usuarios
 */
@Service
public class UserService {

    /**
    * objeto tipo repositorio para crud
    */
    @Autowired
    private UserRepository userRepo;

    /**
	* método para listar todos los usuarios
	*/
    public List<User> getUsers() {
        return userRepo.findAll();
    }
    /**
	* método para listar usuarios por mes de cumpleaños
	*/
    public List<User> findUsersByBirthday(String monthBirthDay) {
        return userRepo.findByMonthBirthtDay(monthBirthDay);
    }

    /**
	* método para agregar o actualizar un usuario
	*/
    public User save(User user) {
        if (user.getId() != null) {
            return userRepo.save(user);
        } else {
            Optional<User> elemento = userRepo.findById(user.getId());
            if (elemento == null) {
                return userRepo.save(user);
            } else {
                return user;
            }

        }
    }

    /**
	* método para validar email de usuario
	*/
    public boolean getValidationEmail(String userEmail) {

        return userRepo.getEmail(userEmail).isPresent();
    
    }

    /**
	* método para validar credenciales de usuario
	*/
    public User getValidationCredentials(String userEmail, String userPassword) {

        User respuestaCred;
        Optional<User> respuesta = userRepo.getEmailAndPassword(userEmail, userPassword);

        if (!respuesta.isPresent()) {
            respuestaCred = new User(null, null, null, null, null, null, null, null, null, null, null);

        } else {
            respuestaCred = respuesta.get();
        }

        return respuestaCred;
    }

    

    /**
	* método para eliminar usuario
	*/
    public boolean deleteUser(Integer userId) {
        return getUser(userId).map( usuario -> {
            userRepo.delete(usuario);
            return true;
        }).orElse(false);
        
    }
    
    /**
	* método para obtener usuario por id
	*/
    public Optional<User> getUser(Integer userid) {
        return userRepo.findById(userid);
    }

    /**
	* método para listar usuarios por zona
	*/
    public List<User> getUserZone() {
        return userRepo.findAll();
    }

   
}
