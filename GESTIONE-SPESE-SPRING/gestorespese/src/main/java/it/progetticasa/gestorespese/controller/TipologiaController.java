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
import it.progetticasa.gestorespese.model.spese.Tipologia;
import it.progetticasa.gestorespese.services.spese.TipologiaService;

@Controller
@RequestMapping(path="/tipologia") 
public class TipologiaController {

  @Autowired
  private TipologiaService tipologiaService;

  @PostMapping(path="/crea")
  public @ResponseBody ResponseEntity<Risposta<Tipologia>> create(@RequestBody Tipologia tipologia) {
	  try {
		  Tipologia tipologiaInserita = tipologiaService.save(tipologia);
		  Risposta<Tipologia> risposta = new Risposta<Tipologia>();
		  risposta.setOggetto(tipologiaInserita);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Tipologia>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Tipologia> risposta = new Risposta<Tipologia>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Tipologia>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @DeleteMapping(path="/delete/{id}")
  public @ResponseBody ResponseEntity<Risposta<Tipologia>> delete(@PathVariable(value="id") Integer id) {
	  try {
		  tipologiaService.deleteTipologia(id);
		  Risposta<Tipologia> risposta = new Risposta<Tipologia>();
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Tipologia>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Tipologia> risposta = new Risposta<Tipologia>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Tipologia>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get/{id}")
  public @ResponseBody ResponseEntity<Risposta<Tipologia>> getById(@PathVariable(value="id") Integer id) {
	  try {
		  Tipologia tipologia = tipologiaService.findyById(id);
		  Risposta<Tipologia> risposta = new Risposta<Tipologia>();
		  risposta.setOggetto(tipologia);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Tipologia>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Tipologia> risposta = new Risposta<Tipologia>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Tipologia>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get-validi")
  public @ResponseBody ResponseEntity<Risposta<List<Tipologia>>> getTipologieValide () {
	  try {
		  List<Tipologia> tipologia = tipologiaService.getValidi();
		  Risposta<List<Tipologia>> risposta = new Risposta<List<Tipologia>>();
		  risposta.setOggetto(tipologia);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<List<Tipologia>>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<List<Tipologia>> risposta = new Risposta<List<Tipologia>>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<List<Tipologia>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @PostMapping(path="/update")
  public @ResponseBody ResponseEntity<Risposta<Tipologia>> updateTipologia (@RequestBody Tipologia tipologia) {
	  try {
		  if(tipologia.getId()!=null) {
			  Tipologia tipologiaModificata = tipologiaService.save(tipologia);
			  Risposta<Tipologia> risposta = new Risposta<Tipologia>();
			  risposta.setOggetto(tipologiaModificata);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<Tipologia>> (risposta, HttpStatus.OK);
		  }else {
			  Risposta<Tipologia> risposta = new Risposta<Tipologia>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("ID TIPOLOGIA non presente");
			  return new ResponseEntity<Risposta<Tipologia>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }

	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Tipologia> risposta = new Risposta<Tipologia>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Tipologia>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }

}
