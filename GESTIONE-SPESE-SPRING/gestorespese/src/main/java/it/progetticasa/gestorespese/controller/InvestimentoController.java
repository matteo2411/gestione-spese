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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import it.progetticasa.gestorespese.dto.InvestimentoDto;
import it.progetticasa.gestorespese.dto.Risposta;
import it.progetticasa.gestorespese.model.investimenti.Investimento;
import it.progetticasa.gestorespese.model.investimenti.StoricoUtenteInvestimento;
import it.progetticasa.gestorespese.model.investimenti.UtenteInvestimento;
import it.progetticasa.gestorespese.services.investimenti.InvestimentoService;
import it.progetticasa.gestorespese.services.investimenti.StoricoUtenteInvestimentoService;
import it.progetticasa.gestorespese.utility.Utility;
import lombok.extern.apachecommons.CommonsLog;

@Controller
@RequestMapping(path="/investimento") 
@CommonsLog
public class InvestimentoController {
	@Autowired
	private InvestimentoService investimentoService;
	@Autowired
	private StoricoUtenteInvestimentoService storicoInvestimentoService;
	

	  @PostMapping(path="")
	  public @ResponseBody ResponseEntity<Risposta<Investimento>> createInvestimento(@RequestBody Investimento investimento) {
		  try {
			  investimento.setDataAggiornamento(Utility.getNowLocale());
			  investimento.setDataInizio(Utility.getNowLocale());
			  Investimento investimentoInserito = investimentoService.save(investimento);
			  Risposta<Investimento> risposta = new Risposta<Investimento>();
			  risposta.setOggetto(investimentoInserito);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<Investimento>> (risposta, HttpStatus.OK);
		  }
		  catch(Exception e) {
			  e.printStackTrace();
			  Risposta<Investimento> risposta = new Risposta<Investimento>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("Errore generico");
			  return new ResponseEntity<Risposta<Investimento>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	  }
	  
	  @PutMapping(path="")
	  public @ResponseBody ResponseEntity<Risposta<Investimento>> updateInvestimento(@RequestBody Investimento investimento) {
		  try {
			  investimento.setDataAggiornamento(Utility.getNowLocale());
			  Investimento investimentoInserito = investimentoService.save(investimento);
			  Risposta<Investimento> risposta = new Risposta<Investimento>();
			  risposta.setOggetto(investimentoInserito);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<Investimento>> (risposta, HttpStatus.OK);
		  }
		  catch(Exception e) {
			  e.printStackTrace();
			  Risposta<Investimento> risposta = new Risposta<Investimento>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("Errore generico");
			  return new ResponseEntity<Risposta<Investimento>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	  }
	  
	  @DeleteMapping(path="/{id}")
	  public @ResponseBody ResponseEntity<Risposta<Investimento>> deleteInvestimento(@PathVariable(value="id") Integer id) {
		  try {
			  investimentoService.delete(id);
			  Risposta<Investimento> risposta = new Risposta<Investimento>();
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<Investimento>> (risposta, HttpStatus.OK);
		  }
		  catch(Exception e) {
			  e.printStackTrace();
			  Risposta<Investimento> risposta = new Risposta<Investimento>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("Errore generico");
			  return new ResponseEntity<Risposta<Investimento>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	  }
	  
	  @GetMapping(path="/{id}")
	  public @ResponseBody ResponseEntity<Risposta<Investimento>> getById(@PathVariable(value="id") Integer id) {
		  try {
			  Investimento investimento = investimentoService.findInvestimento(id);
			  Risposta<Investimento> risposta = new Risposta<Investimento>();
			  risposta.setOggetto(investimento);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<Investimento>> (risposta, HttpStatus.OK);
		  }
		  catch(Exception e) {
			  e.printStackTrace();
			  Risposta<Investimento> risposta = new Risposta<Investimento>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("Errore generico");
			  return new ResponseEntity<Risposta<Investimento>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	  }
	  
	  @GetMapping(path="/get-all-valid")
	  public @ResponseBody ResponseEntity<Risposta<List<Investimento>>> getValidi() {
		  try {
			  List<Investimento> investimenti = investimentoService.getValidi();
			  Risposta<List<Investimento>> risposta = new Risposta<List<Investimento>>();
			  risposta.setOggetto(investimenti);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<List<Investimento>>> (risposta, HttpStatus.OK);
		  }
		  catch(Exception e) {
			  e.printStackTrace();
			  Risposta<List<Investimento>> risposta = new Risposta<List<Investimento>>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("Errore generico");
			  return new ResponseEntity<Risposta<List<Investimento>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	  }
	  
	  @PostMapping(path="/get-all-valid-utente")
	  public @ResponseBody ResponseEntity<Risposta<List<UtenteInvestimento>>> getValidiUtente(@RequestBody InvestimentoDto investimento) {
		  try {
			  List<UtenteInvestimento> investimenti = investimentoService.getValidiUtente(investimento);
			  Risposta<List<UtenteInvestimento>> risposta = new Risposta<List<UtenteInvestimento>>();
			  risposta.setOggetto(investimenti);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<List<UtenteInvestimento>>> (risposta, HttpStatus.OK);
		  }
		  catch(Exception e) {
			  e.printStackTrace();
			  Risposta<List<UtenteInvestimento>> risposta = new Risposta<List<UtenteInvestimento>>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("Errore generico");
			  return new ResponseEntity<Risposta<List<UtenteInvestimento>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	  }
	  
	  @PostMapping(path="/salva-investimento-utente")
	  public @ResponseBody ResponseEntity<Risposta<UtenteInvestimento>> saveInvestimentoUtente(@RequestBody InvestimentoDto investimento) {
		  try {
			  UtenteInvestimento investimentoInserito = investimentoService.aggiornaInvestimento(investimento);
			  Risposta<UtenteInvestimento> risposta = new Risposta<UtenteInvestimento>();
			  risposta.setOggetto(investimentoInserito);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<UtenteInvestimento>> (risposta, HttpStatus.OK);
		  }
		  catch(Exception e) {
			  e.printStackTrace();
			  Risposta<UtenteInvestimento> risposta = new Risposta<UtenteInvestimento>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("Errore generico");
			  return new ResponseEntity<Risposta<UtenteInvestimento>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	  }
	  
	  @PostMapping(path="/ricerca-storico")
	  public @ResponseBody ResponseEntity<Risposta<List<StoricoUtenteInvestimento>>> getStorico(@RequestBody UtenteInvestimento utenteInvestimento) {
		  try {
			  StoricoUtenteInvestimento storicoProbe = new StoricoUtenteInvestimento();
			  storicoProbe.setUtenteInvestimento(utenteInvestimento);
			  List<StoricoUtenteInvestimento> lista = storicoInvestimentoService.ricerca(storicoProbe);
			  Risposta<List<StoricoUtenteInvestimento>> risposta = new Risposta<List<StoricoUtenteInvestimento>>();
			  risposta.setOggetto(lista);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<List<StoricoUtenteInvestimento>>> (risposta, HttpStatus.OK);
		  }
		  catch(Exception e) {
			  e.printStackTrace();
			  Risposta<List<StoricoUtenteInvestimento>> risposta = new Risposta<List<StoricoUtenteInvestimento>>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("Errore generico");
			  return new ResponseEntity<Risposta<List<StoricoUtenteInvestimento>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	  }
}
