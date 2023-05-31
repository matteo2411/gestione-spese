package it.progetticasa.gestorespese.services.spese;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.progetticasa.gestorespese.dto.SpesaDto;
import it.progetticasa.gestorespese.model.spese.Categoria;
import it.progetticasa.gestorespese.model.spese.Spesa;
import it.progetticasa.gestorespese.repositories.spese.CategoriaRepository;
import it.progetticasa.gestorespese.utility.Utility;

@Service
@Transactional
public class CategoriaService {

	@Autowired
	private CategoriaRepository categoriaRepository;
	@Autowired
	private SpesaService spesaService;

	public Categoria save(Categoria categoria) {
		return categoriaRepository.save(categoria);
	}
	public void delete(Integer id) {
		categoriaRepository.deleteById(id);
	}
	public Categoria findyById(Integer id) {
		return categoriaRepository.findById(id).get();
	}
	public List<Categoria> getValidi() {
		return (List<Categoria>) categoriaRepository.findAll()
				.stream()
				.filter(categoria -> isValid(categoria))
				.collect(Collectors.toList());
	}
	public List<Categoria> getValidiRoot() {
		return (List<Categoria>) categoriaRepository.findAll()
				.stream()
				.filter(categoria -> isValidAndRoot(categoria))
				.collect(Collectors.toList());
	}
	public List<Categoria> ricercaFigli(Categoria categoriaExample) {
		Example<Categoria> example = Example.of(categoriaExample);
		return (List<Categoria>) categoriaRepository.findAll(example)
				.stream()
				.filter(categoria -> isValid(categoria))
				.collect(Collectors.toList());
	}

	public Boolean isValidAndRoot(Categoria categoria) {
		return isValid(categoria) && isRoot(categoria);
	}

	public Boolean isRoot(Categoria categoria) {
		return categoria.getCategoriaPadre() == null;
	}
	
	public Boolean isValid(Categoria categoria) {
		return categoria.getDataFine() == null;
	}
	
	public void deleteCategoria(Integer id) throws SerialException, SQLException {
		SpesaDto spesa = new SpesaDto();
		  Categoria categoria = findyById(id);
		  spesa.setCategoriaScelta(categoria);
		  List<Spesa> listaSpese = spesaService.ricercaByFilter(spesa);
		  if(listaSpese!=null && listaSpese.size()>0) {
			  categoria.setDataFine(Utility.getNowSql());
			  save(categoria);
		  }else {
			  delete(id);
		  }
	}
}
