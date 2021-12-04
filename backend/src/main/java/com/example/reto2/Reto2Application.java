package com.example.reto2;

import com.example.reto2.CrudRepository.ChocolateRepository;
import com.example.reto2.CrudRepository.OrderRepository;
import com.example.reto2.CrudRepository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Reto2Application  implements CommandLineRunner{

	@Autowired
    private ChocolateRepository interfaceChocolate;
    @Autowired
    private UserRepository interfaceUser;
    @Autowired
    private OrderRepository interfaceOrder;
    
	public static void main(String[] args) {
		SpringApplication.run(Reto2Application.class, args);
	}

	@Override
    public void run(String... args) throws Exception {
        interfaceChocolate.deleteAll();
        interfaceUser.deleteAll();
        interfaceOrder.deleteAll();
    }

}
