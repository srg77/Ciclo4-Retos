package com.example.reto2.CrudRepository;

import java.util.Date;
import java.util.List;
// import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.data.mongodb.repository.Query;

import com.example.reto2.Models.Documents.Order;
// import com.example.reto2.Models.Documents.User;

public interface OrderRepository extends MongoRepository<Order, Integer>{

	
	public List<Order> findBySalesManZone(String salesMan);
	
	public List<Order> findBySalesManIdAndStatus(Integer id, String status);
	
	public List<Order> findBySalesManIdAndRegisterDay(Integer id, Date registerDay);
	
	public List<Order> findBySalesManId(Integer id);
}
