package com.Reto1.springboot.app.Services;

import java.util.List;
import java.util.Optional;
import com.Reto1.springboot.app.Models.entities.User;
import com.Reto1.springboot.app.Repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository metodosCrud;

    public List<User> getAll(){
        return metodosCrud.getAll();
    }
    public Optional<User> getUser(int userId) {
        return metodosCrud.getUser(userId);
    }
    public boolean getValidationEmail (String userEmail){
        
        if (metodosCrud.validateEmail(userEmail).isPresent()) {
            return true;
        } else {
            return false;
        }
    }
    public User getValidationCredentials (String userEmail, String userPassword){
        
        User respuestaCredenciales;
        Optional<User> respuesta = metodosCrud.validateCredentials(userEmail, userPassword);
        
        if (!respuesta.isPresent()){
            respuestaCredenciales = new User(null, userEmail, "NO DEFINIDO",userPassword );
        }else{
            respuestaCredenciales = respuesta.get();
        }

        return respuestaCredenciales;
    }

    public User save(User user){
        if(user.getId() == null){
            return metodosCrud.save(user);
        }else{
            Optional<User> e = metodosCrud.getUser(user.getId());
            if(e == null){
                return metodosCrud.save(user);
            }else{
                return user;
            }
        }
    }





    
}
