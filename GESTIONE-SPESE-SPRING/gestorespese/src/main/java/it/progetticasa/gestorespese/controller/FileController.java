package it.progetticasa.gestorespese.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import it.progetticasa.gestorespese.dto.Risposta;
import it.progetticasa.gestorespese.dto.SpesaDto;
import it.progetticasa.gestorespese.model.User;
import it.progetticasa.gestorespese.model.spese.Account;
import it.progetticasa.gestorespese.model.spese.Spesa;
import it.progetticasa.gestorespese.services.spese.AccountService;
import it.progetticasa.gestorespese.services.spese.SpesaService;
import it.progetticasa.gestorespese.utility.Utility;

@Controller
@RequestMapping(path="/file") 
public class FileController {
	  @Autowired
	  private SpesaService spesaService;
	  @Autowired
	  private AccountService accountService;

	  @PostMapping(path="/elabora-spese")
	  public @ResponseBody ResponseEntity<Risposta<List<SpesaDto>>> elaboraFideuram(
			  @RequestParam MultipartFile file, @RequestParam Integer accountId, @RequestParam Integer utenteId) {
		  try {
			  Risposta<List<SpesaDto>> risposta = new Risposta<List<SpesaDto>>();
			  List<SpesaDto> listSpese = Utility.elaboraSpese(file);
			  Account account = accountService.findyById(accountId);
			  for(SpesaDto spesa : listSpese) {
				  spesa.setAccount(account);
				  spesa.setUtente(new User());
				  spesa.getUtente().setId(utenteId);
				  List<Spesa> spesePresenti = spesaService.ricerca(spesa);
				  spesa.setSpesaPresente(spesePresenti!=null && spesePresenti.size()>0);
			  }
			  risposta.setOggetto(listSpese);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<List<SpesaDto>>> (risposta, HttpStatus.OK);
		  }
		  catch(Exception e) {
			  e.printStackTrace();
			  Risposta<List<SpesaDto>> risposta = new Risposta<List<SpesaDto>>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("Errore generico");
			  return new ResponseEntity<Risposta<List<SpesaDto>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	  }
}
