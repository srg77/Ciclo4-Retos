package com.example.reto2.Services;

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
}
