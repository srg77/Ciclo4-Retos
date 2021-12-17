package com.example.reto2.CrudRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
// import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
// import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Query;

import com.example.reto2.Models.Documents.Order;
// import com.example.reto2.Models.Documents.User;

public interface OrderRepository extends MongoRepository<Order, Integer>{

	
	public List<Order> findBySalesManZone(String salesMan);
	
	public List<Order> findBySalesManIdAndStatus(Integer id, String status);
	
	//@Query("{'registerDay': 0? , 'salesMan._id':1? }")
	public List<Order> findByRegisterDayAndSalesManId(LocalDateTime registerDay, Integer id);
	
	public List<Order> findBySalesManId(Integer id);
}
