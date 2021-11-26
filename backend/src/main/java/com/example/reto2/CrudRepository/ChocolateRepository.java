package com.example.reto2.CrudRepository;

import com.example.reto2.Models.Documents.Chocolate;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface ChocolateRepository extends MongoRepository<Chocolate, String>{
    
}
