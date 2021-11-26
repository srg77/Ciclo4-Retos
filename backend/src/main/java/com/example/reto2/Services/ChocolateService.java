package com.example.reto2.Services;

import java.util.List;
import java.util.Optional;

import com.example.reto2.CrudRepository.ChocolateRepository;
import com.example.reto2.Models.Documents.Chocolate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChocolateService {

    @Autowired
    private ChocolateRepository chocolateRepo;

    /**
     * 
     * Listar todos los productos
     */
    public List<Chocolate> getProducts(){

        return chocolateRepo.findAll();
    }
    /**
     * Guardar o actualizar producto
     */
	public Chocolate save(Chocolate chocolate) {

        //Guarda un producto nuevo
		if (chocolate.getReference() != null) {
			return chocolateRepo.save(chocolate);
		}
        //Actualiza si ya existe el producto 
        else {
			Optional<Chocolate> e = chocolateRepo.findById(chocolate.getReference());
			if (e == null) {
				return chocolateRepo.save(chocolate);
			} else {
				return chocolate;
			}

		}
	}
    /**
     * Listar producto por id
     */
    public Optional<Chocolate> getProduct(String productId) {
        return chocolateRepo.findById(productId);
    }
    /**
     * 
     * Eliminar Producto
     */
	public boolean deleteProduct(String productId) {
        Boolean aBoolean = getProduct(productId).map(usuario -> {
            chocolateRepo.delete(usuario);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}
