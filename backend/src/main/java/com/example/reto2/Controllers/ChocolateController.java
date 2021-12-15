package com.example.reto2.Controllers;

import java.util.List;
import java.util.Optional;

import com.example.reto2.Models.Documents.Chocolate;
import com.example.reto2.Services.ChocolateService;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chocolate")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,RequestMethod.DELETE })
public class ChocolateController {

    @Autowired
	private ChocolateService productService;

    @GetMapping("/{id}")
    public Optional<Chocolate> getId(@PathVariable("id") String productId) {
		return productService.getProduct(productId);
	}

	@GetMapping("/all")
	public List<Chocolate> getAll() {
		return productService.getProducts();
	}
    @GetMapping("/price/{value}")
	public List<Chocolate> getProductsByPrice(@PathVariable("value") double productPrice) {
		return productService.getProductsByPrice(productPrice);
	}
    @GetMapping("/description/{word}")
	public List<Chocolate> getProductsByPrice(@PathVariable("word") String description) {
		return productService.getProductsByDescription(description);
	}
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/new")
	public Chocolate createProduct(@RequestBody Chocolate product) {
		return productService.save(product);
	}

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Chocolate update(@RequestBody Chocolate product) {
        return productService.save(product);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") String productId) {
        return productService.deleteProduct(productId);
    }
    
    


    
}
