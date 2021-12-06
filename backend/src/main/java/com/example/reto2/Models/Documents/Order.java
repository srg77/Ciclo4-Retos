package com.example.reto2.Models.Documents;

import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "orders")
public class Order {
    public static String PENDING = "Pendiente";
    public static String APROVED = "Aprobada";
    public static String REJECTED = "Rechazada";
    
    @Id
    private Integer id;
    private Date registerDay;
    private String status = PENDING;
    private User salesMan;
    
    private Map<String, Chocolate> products;
    private Map<String, Integer> quantities;
    
    
	public static String getPENDING() {
		return PENDING;
	}
	public static void setPENDING(String pENDING) {
		PENDING = pENDING;
	}
	public static String getAPROVED() {
		return APROVED;
	}
	public static void setAPROVED(String aPROVED) {
		APROVED = aPROVED;
	}
	public static String getREJECTED() {
		return REJECTED;
	}
	public static void setREJECTED(String rEJECTED) {
		REJECTED = rEJECTED;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getRegisterDay() {
		return registerDay;
	}
	public void setRegisterDay(Date registerDay) {
		this.registerDay = registerDay;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public User getSalesMan() {
		return salesMan;
	}
	public void setSalesMan(User salesMan) {
		this.salesMan = salesMan;
	}
	public Map<String, Chocolate> getProducts() {
		return products;
	}
	public void setProducts(Map<String, Chocolate> products) {
		this.products = products;
	}
	public Map<String, Integer> getQuantities() {
		return quantities;
	}
	public void setQuantities(Map<String, Integer> quantities) {
		this.quantities = quantities;
	}
	public Order() {
		
	}   
    
    
    
}
