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
import it.progetticasa.gestorespese.model.spese.Categoria;
import it.progetticasa.gestorespese.services.spese.CategoriaService;

@Controller
@RequestMapping(path="/categoria") 
public class CategoriaController {

  @Autowired
  private CategoriaService categoriaService;

  @PostMapping(path="/crea")
  public @ResponseBody ResponseEntity<Risposta<Categoria>> create(@RequestBody Categoria categoria) {
	  try {
		  Categoria categoriaInserita = categoriaService.save(categoria);
		  Risposta<Categoria> risposta = new Risposta<Categoria>();
		  risposta.setOggetto(categoriaInserita);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Categoria>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Categoria> risposta = new Risposta<Categoria>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Categoria>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @DeleteMapping(path="/delete/{id}")
  public @ResponseBody ResponseEntity<Risposta<Categoria>> delete(@PathVariable(value="id") Integer id) {
	  try {
		  categoriaService.deleteCategoria(id);
		  Risposta<Categoria> risposta = new Risposta<Categoria>();
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Categoria>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Categoria> risposta = new Risposta<Categoria>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Categoria>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get/{id}")
  public @ResponseBody ResponseEntity<Risposta<Categoria>> getCategoria (@PathVariable(value="id") Integer id) {
	  try {
		  Categoria categoria = categoriaService.findyById(id);
		  Risposta<Categoria> risposta = new Risposta<Categoria>();
		  risposta.setOggetto(categoria);
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<Categoria>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Categoria> risposta = new Risposta<Categoria>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Categoria>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get-validi")
  public @ResponseBody ResponseEntity<Risposta<List<Categoria>>> getAllCategorieValide () {
	  try {
		  Risposta<List<Categoria>> risposta = new Risposta<List<Categoria>>();
		  risposta.setOggetto(categoriaService.getValidi());
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<List<Categoria>>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<List<Categoria>> risposta = new Risposta<List<Categoria>>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<List<Categoria>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @GetMapping(path="/get-validi-root")
  public @ResponseBody ResponseEntity<Risposta<List<Categoria>>> getAllCategorieRootValide () {
	  try {
		  Risposta<List<Categoria>> risposta = new Risposta<List<Categoria>>();
		  risposta.setOggetto(categoriaService.getValidiRoot());
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<List<Categoria>>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<List<Categoria>> risposta = new Risposta<List<Categoria>>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<List<Categoria>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @PostMapping(path="/get-validi-figli")
  public @ResponseBody ResponseEntity<Risposta<List<Categoria>>> getAllCategorieValideFiglie (@RequestBody Categoria categoria) {
	  try {
		  Risposta<List<Categoria>> risposta = new Risposta<List<Categoria>>();
		  risposta.setOggetto(categoriaService.ricercaFigli(categoria));
		  risposta.setSuccess(true);
		  return new ResponseEntity<Risposta<List<Categoria>>> (risposta, HttpStatus.OK);
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<List<Categoria>> risposta = new Risposta<List<Categoria>>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<List<Categoria>>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }
  
  @PostMapping(path="/update")
  public @ResponseBody ResponseEntity<Risposta<Categoria>> updateCategoria (@RequestBody Categoria categoria) {
	  try {
		  if(categoria.getId()!=null) {
			  Categoria categoriaModificata = categoriaService.save(categoria);
			  Risposta<Categoria> risposta = new Risposta<Categoria>();
			  risposta.setOggetto(categoriaModificata);
			  risposta.setSuccess(true);
			  return new ResponseEntity<Risposta<Categoria>> (risposta, HttpStatus.OK);
		  }else {
			  Risposta<Categoria> risposta = new Risposta<Categoria>();
			  risposta.setSuccess(false);
			  risposta.setMessaggioErrore("ID CATEGORIA non presente");
			  return new ResponseEntity<Risposta<Categoria>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
		  }
	  }
	  catch(Exception e) {
		  e.printStackTrace();
		  Risposta<Categoria> risposta = new Risposta<Categoria>();
		  risposta.setSuccess(false);
		  risposta.setMessaggioErrore("Errore generico");
		  return new ResponseEntity<Risposta<Categoria>> (risposta, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
  }

}
