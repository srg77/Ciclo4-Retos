package com.example.reto2.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


import com.example.reto2.Models.Documents.Order;
import com.example.reto2.Services.OrderService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,RequestMethod.DELETE })
public class OrderController {

	@Autowired
	OrderService orderServ;
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/order/new")
	public Order createOrder(@RequestBody Order order) {
		return orderServ.save(order);
	}
	
	
	@GetMapping("/order/all")
	public List<Order> getAllOrders() {
		return orderServ.getOrders();
	}
	
	
	@GetMapping("/order/{id}")
    public Optional<Order> getOrder(@PathVariable("id") int order) {
        return orderServ.getOrder(order);
    }
	
	@PutMapping("/order/update")
	@ResponseStatus(HttpStatus.CREATED)
	public Order update(@RequestBody Order order) {
		return orderServ.save(order);
	}
	
	@GetMapping("/order/zona/{zone}")
	public List<Order> getZone( @PathVariable("zone") String zone) {
		return orderServ.findZone(zone);
	}
}


