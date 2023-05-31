package it.progetticasa.gestorespese.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import it.progetticasa.gestorespese.dto.SpesaDto;
import it.progetticasa.gestorespese.dto.SpesaMeseDto;
import it.progetticasa.gestorespese.model.spese.Spesa;
import it.progetticasa.gestorespese.services.spese.SpesaService;

@Controller
@RequestMapping(path="/spesa") 
public class SpesaController {

  @Autowired
  private SpesaService spesaService;

  @GetMapping(path="/download-template-spese")
  public @ResponseBody ResponseEntity<ByteArrayResource> donwloadTemplateSpese() throws Exception {
	  try {
		  File file = new File("src/main/resources/template.xlsx");
		  
	      HttpHeaders header = new HttpHeaders();
	      header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=template.xlsx");
	      header.add("Cache-Control", "no-cache, no-store, must-revalidate");
	      header.add("Pragma", "no-cache");
	      header.add("Expires", "0");
	        
		  Path path = Paths.get( file.getAbsolutePath() );
		  ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
		  
		  return ResponseEntity.ok()
	                .headers(header)
		            .contentLength(file.length())
		            .contentType(MediaType.APPLICATION_OCTET_STREAM)
		            .body(resource);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  throw e;
      }
  }

  @PostMapping(path="/crea")
  public @ResponseBody ResponseEntity<Risposta<Spesa>> create(@RequestBody Spesa spesa) {
	  try {
		  Spesa spesaInserita = spesaService.save(spesa);
		  Risposta<Spesa> risposta = new Risposta<Spesa>();
		  risposta.setOggetto(spesaInserita);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Spesa>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Spesa> risposta = new Risposta<Spesa>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Spesa>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }

  @PostMapping(path="/crea-lista")
  public @ResponseBody ResponseEntity<Risposta<Object>> createList(@RequestBody List<SpesaDto> spese) {
	  try {
		  spesaService.creaLista(spese);
		  Risposta<Object> risposta = new Risposta<Object>();
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Object>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Object> risposta = new Risposta<Object>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Object>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @DeleteMapping(path="/delete/{id}")
  public @ResponseBody ResponseEntity<Risposta<Spesa>> delete(@PathVariable(value="id") Integer id) {
	  try {
		  spesaService.delete(id);
		  Risposta<Spesa> risposta = new Risposta<Spesa>();
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Spesa>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Spesa> risposta = new Risposta<Spesa>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Spesa>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get/{id}")
  public @ResponseBody ResponseEntity<Risposta<Spesa>> getUser (@PathVariable(value="id") Integer id) {
	  try {
		  Spesa spesa = spesaService.findyById(id);
		  Risposta<Spesa> risposta = new Risposta<Spesa>();
		  risposta.setOggetto(spesa);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Spesa>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Spesa> risposta = new Risposta<Spesa>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Spesa>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @PostMapping(path="/update")
  public @ResponseBody ResponseEntity<Risposta<Spesa>> update (@RequestBody Spesa spesa) {
	  try {
		  if(spesa.getId()!=null) {
			  Spesa spesaModificata = spesaService.save(spesa);
			  Risposta<Spesa> risposta = new Risposta<Spesa>();
			  risposta.setOggetto(spesaModificata);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<Spesa>> (risposta, HttpStatus.OK);
		  }else {
			  Risposta<Spesa> risposta = new Risposta<Spesa>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("ID SPESA non presente");
			  return new ResponseEntity<Risposta<Spesa>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }

	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Spesa> risposta = new Risposta<Spesa>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Spesa>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @PostMapping(path="/ricerca")
  public @ResponseBody ResponseEntity<Risposta<List<SpesaDto>>> ricerca (@RequestBody SpesaDto spesa) {
	  try {
		  List<Spesa> listaSpese = spesaService.ricercaByFilter(spesa);
		  List<SpesaDto> listaSpeseDto = new ArrayList<>();
		  Risposta<List<SpesaDto>> risposta = new Risposta<List<SpesaDto>>();
		  for(Spesa spesaModel : listaSpese) {
			  listaSpeseDto.add(new SpesaDto(spesaModel));
		  }
		  risposta.setOggetto(listaSpeseDto);
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
  
  @GetMapping(path="/ultima")
  public @ResponseBody ResponseEntity<Risposta<SpesaDto>> ultima () {
	  try {
		  Risposta<SpesaDto> risposta = new Risposta<SpesaDto>();
		  risposta.setOggetto(new SpesaDto(spesaService.findLast()));
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<SpesaDto>> (risposta, HttpStatus.OK);

	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<SpesaDto> risposta = new Risposta<SpesaDto>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<SpesaDto>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @PostMapping(path="/riepilogo-spese")
  public @ResponseBody ResponseEntity<Risposta<List<SpesaMeseDto>>> riepilogoSpese (@RequestBody SpesaMeseDto spesa) {
	  try {
		  List<SpesaMeseDto> list = new ArrayList<>();
		  for(int i=1; i<13; i++) {
			  list.add(spesaService.spesePerMese(i, spesa));
		  }
		  Risposta<List<SpesaMeseDto>> risposta = new Risposta<List<SpesaMeseDto>>();
		  risposta.setOggetto(list);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<List<SpesaMeseDto>>> (risposta, HttpStatus.OK);

	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<List<SpesaMeseDto>> risposta = new Risposta<List<SpesaMeseDto>>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<List<SpesaMeseDto>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }

}
