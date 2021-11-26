package com.example.reto2.Models.Documents;

// import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "usuarios")
public class User {

	@Id
	private Integer id;
	private String identification;
	private String name;
	// private Date birthtDay;
	// private String monthBirthtDay;
	private String address;
	private String cellPhone;
	private String email;
	private String password;
	private String zone;
	private String type ; 
	
	// public User(Integer id, String identification, String name, String address, String cellPhone, String email,
	// 		String password, String zone, String type) {
	// 	this.id = id;
	// 	this.identification = identification;
	// 	this.name = name;
	// 	this.address = address;
	// 	this.cellPhone = cellPhone;
	// 	this.email = email;
	// 	this.password = password;
	// 	this.zone = zone;
	// 	this.type = type;
	// }
}
