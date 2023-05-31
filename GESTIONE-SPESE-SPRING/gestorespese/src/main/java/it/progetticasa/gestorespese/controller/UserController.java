package it.progetticasa.gestorespese.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import it.progetticasa.gestorespese.dto.Risposta;
import it.progetticasa.gestorespese.model.User;
import it.progetticasa.gestorespese.services.UserService;

@Controller
@RequestMapping(path="/utente") 
public class UserController {

  @Autowired
  private UserService userService;

  @PostMapping(path="/crea")
  public @ResponseBody ResponseEntity<Risposta<User>> create(@RequestBody User utente) {
	  try {
		  User user = userService.save(utente);
		  Risposta<User> risposta = new Risposta<User>();
		  risposta.setOggetto(user);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<User>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<User> risposta = new Risposta<User>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<User>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @DeleteMapping(path="/delete/{id}")
  public @ResponseBody ResponseEntity<Risposta<User>> delete(@PathVariable(value="id") Integer id) {
	  try {
		  userService.deleteUser(id);
		  Risposta<User> risposta = new Risposta<User>();
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<User>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<User> risposta = new Risposta<User>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<User>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get/{id}")
  public @ResponseBody ResponseEntity<Risposta<User>> getById(@PathVariable(value="id") Integer id) {
	  try {
		  User user = userService.findUser(id);
		  Risposta<User> risposta = new Risposta<User>();
		  risposta.setOggetto(user);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<User>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<User> risposta = new Risposta<User>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<User>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get-validi")
  public @ResponseBody ResponseEntity<Risposta<List<User>>> getAll() {
	  try {
		  List<User> user = userService.getValidi();
		  Risposta<List<User>> risposta = new Risposta<List<User>>();
		  risposta.setOggetto(user);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<List<User>>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<List<User>> risposta = new Risposta<List<User>>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<List<User>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @PostMapping(path="/update")
  public @ResponseBody ResponseEntity<Risposta<User>> update(@RequestBody User utente) {
	  try {
		  if(utente.getId()!=null) {
			  User user = userService.save(utente);
			  Risposta<User> risposta = new Risposta<User>();
			  risposta.setOggetto(user);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<User>> (risposta, HttpStatus.OK);
		  }else {
			  Risposta<User> risposta = new Risposta<User>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("ID UTENTE non presente");
			  return new ResponseEntity<Risposta<User>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }

	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<User> risposta = new Risposta<User>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<User>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }

}
