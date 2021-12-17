package com.example.reto2.Services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.reto2.CrudRepository.OrderRepository;
import com.example.reto2.Models.Documents.Order;

@Service
public class OrderService {

	@Autowired
	OrderRepository orderRepo;
	
	public Order save(Order order) {
		Optional<Order> e = orderRepo.findById(order.getId());
		//Actualiza si ya existe el producto 
		if(e.isPresent()) {
			Order actua = new Order();
			actua.setId(e.get().getId());
			actua.setProducts(e.get().getProducts());
			actua.setStatus(order.getStatus());
			actua.setQuantities(e.get().getQuantities());
			actua.setRegisterDay(e.get().getRegisterDay());
			actua.setSalesMan(e.get().getSalesMan());
			return orderRepo.save(actua);
		}
		else {
			//Guarda un producto nuevo
			if (order.getId() != null) {
				return orderRepo.save(order);
			}
			return order;
		}
        
		
        
	}
	
	 // listar todos los Orders
    public List<Order> getOrders() {
        return orderRepo.findAll();
    }
    
  	//validar por ID
    public Optional<Order> getOrder(int order) {
        return orderRepo.findById(order);
    }
	
    //find by zone
    public List<Order> findZone(String zone) {
		return orderRepo.findBySalesManZone(zone);
    }
    
    //find by fecha y id
    public List<Order> findIdAndDate(String registerDay, Integer id ) {

		DateTimeFormatter formatoFecha = DateTimeFormatter.ofPattern("yyyy-MM-dd");

		LocalDateTime localDate =  LocalDate.parse(registerDay, formatoFecha).atStartOfDay();
		

		SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
		// Date dateOne = new Date();

		// try {

		// 	// dateOne = parser.parse(registerDay);

		// 	System.out.println(registerDay);
			System.out.println(localDate);

		// } catch (ParseException e) {

		// 	e.printStackTrace();
		// }
		return orderRepo.findByRegisterDayAndSalesManId(localDate, id);
    }
    
    //find by status y id
    public List<Order> findIdAndStatus(Integer id, String status) {
    	
		return orderRepo.findBySalesManIdAndStatus(id, status);
    }
    
    //find by idUser
    public List<Order> findIdUser(Integer id) {
    	
		return orderRepo.findBySalesManId(id);
    }
}
