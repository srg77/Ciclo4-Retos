package com.example.reto2.Services;

import java.util.List;
import java.util.Optional;
import com.example.reto2.CrudRepository.UserRepository;
import com.example.reto2.Models.Documents.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    // listar todos los usuarios
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    // Guardar usuario
    public User save(User user) {
        if (user.getId() != null) {
            return userRepo.save(user);
        } else {
            Optional<User> e = userRepo.findById(user.getId());
            if (e == null) {
                return userRepo.save(user);
            } else {
                return user;
            }

        }
    }

    // validacion de email
    public boolean getValidationEmail(String userEmail) {

        if (userRepo.getEmail(userEmail).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    // validacion email-contraseña

    public User getValidationCredentials(String userEmail, String userPassword) {

        User respuestaCredenciales;
        Optional<User> respuesta = userRepo.getEmailAndPassword(userEmail, userPassword);

        if (!respuesta.isPresent()) {
            respuestaCredenciales = new User(null, null, null, null, null, null, null, null, null);

        } else {
            respuestaCredenciales = respuesta.get();
        }

        return respuestaCredenciales;
    }

    public Optional<User> getUser(Integer userid) {
        return userRepo.findById(userid);
    }

    // eliminar registro
    public boolean deleteUser(Integer userId) {
        Boolean aBoolean = getUser(userId).map(usuario -> {
            userRepo.delete(usuario);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}
