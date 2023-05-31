package it.progetticasa.gestorespese.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import it.progetticasa.gestorespese.dto.Risposta;
import it.progetticasa.gestorespese.model.spese.StoricoSpese;
import it.progetticasa.gestorespese.services.spese.StoricoSpeseService;

@Controller
@RequestMapping(path="/storico") 
public class StoricoController {

  @Autowired
  private StoricoSpeseService storicoService;
  
  @PostMapping(path="/ricerca")
  public @ResponseBody ResponseEntity<Risposta<List<StoricoSpese>>> ricerca (@RequestBody StoricoSpese operazione) {
	  try {
		  List<StoricoSpese> lista = storicoService.ricerca(operazione);
		  Risposta<List<StoricoSpese>> risposta = new Risposta<List<StoricoSpese>>();
		  risposta.setOggetto(lista);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<List<StoricoSpese>>> (risposta, HttpStatus.OK);

	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<List<StoricoSpese>> risposta = new Risposta<List<StoricoSpese>>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<List<StoricoSpese>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }

}
