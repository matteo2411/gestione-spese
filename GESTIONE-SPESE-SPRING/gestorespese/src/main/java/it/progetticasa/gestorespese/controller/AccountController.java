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
import it.progetticasa.gestorespese.model.spese.Account;
import it.progetticasa.gestorespese.services.spese.AccountService;

@Controller
@RequestMapping(path="/account") 
public class AccountController {

  @Autowired
  private AccountService accountService;

  @PostMapping(path="/crea")
  public @ResponseBody ResponseEntity<Risposta<Account>> create(@RequestBody Account account) {
	  try {
		  Account accountInserita = accountService.save(account);
		  Risposta<Account> risposta = new Risposta<Account>();
		  risposta.setOggetto(accountInserita);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Account>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Account> risposta = new Risposta<Account>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Account>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @DeleteMapping(path="/delete/{id}")
  public @ResponseBody ResponseEntity<Risposta<Account>> delete(@PathVariable(value="id") Integer id) {
	  try {
		  accountService.deleteAccount(id);
		  Risposta<Account> risposta = new Risposta<Account>();
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Account>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Account> risposta = new Risposta<Account>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Account>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get/{id}")
  public @ResponseBody ResponseEntity<Risposta<Account>> getAccount (@PathVariable(value="id") Integer id) {
	  try {
		  Account account = accountService.findyById(id);
		  Risposta<Account> risposta = new Risposta<Account>();
		  risposta.setOggetto(account);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Account>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Account> risposta = new Risposta<Account>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Account>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get-validi")
  public @ResponseBody ResponseEntity<Risposta<List<Account>>> getAllAccountValidi () {
	  try {
		  List<Account> account = accountService.getValidi();
		  Risposta<List<Account>> risposta = new Risposta<List<Account>>();
		  risposta.setOggetto(account);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<List<Account>>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<List<Account>> risposta = new Risposta<List<Account>>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<List<Account>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get-storici")
  public @ResponseBody ResponseEntity<Risposta<List<Account>>> getAllAccountStorici () {
	  try {
		  List<Account> account = accountService.getStorici();
		  Risposta<List<Account>> risposta = new Risposta<List<Account>>();
		  risposta.setOggetto(account);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<List<Account>>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<List<Account>> risposta = new Risposta<List<Account>>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<List<Account>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @PostMapping(path="/update")
  public @ResponseBody ResponseEntity<Risposta<Account>> updateAccount (@RequestBody Account account) {
	  try {
		  if(account.getId()!=null) {
			  Account accountModificata = accountService.save(account);
			  Risposta<Account> risposta = new Risposta<Account>();
			  risposta.setOggetto(accountModificata);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<Account>> (risposta, HttpStatus.OK);
		  }else {
			  Risposta<Account> risposta = new Risposta<Account>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("ID CATEGORIA non presente");
			  return new ResponseEntity<Risposta<Account>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }

	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Account> risposta = new Risposta<Account>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Account>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }

}
