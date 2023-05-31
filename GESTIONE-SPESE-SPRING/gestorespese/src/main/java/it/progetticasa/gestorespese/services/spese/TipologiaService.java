package it.progetticasa.gestorespese.services.spese;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.progetticasa.gestorespese.dto.SpesaDto;
import it.progetticasa.gestorespese.model.spese.Spesa;
import it.progetticasa.gestorespese.model.spese.Tipologia;
import it.progetticasa.gestorespese.repositories.spese.TipologiaRepository;
import it.progetticasa.gestorespese.utility.Utility;

@Service
@Transactional
public class TipologiaService {
	
	@Autowired
	private TipologiaRepository tipologiaRepository;
	@Autowired
	private SpesaService spesaService;

	public Tipologia save(Tipologia tipologia) {
		return tipologiaRepository.save(tipologia);
	}
	public void delete(Integer id) {
		tipologiaRepository.deleteById(id);
	}
	public Tipologia findyById(Integer id) {
		return tipologiaRepository.findById(id).get();
	}
	public Tipologia findByName(String name) {
		return tipologiaRepository.findByNomeTipologia(name);
	}
	public List<Tipologia> getAll() {
		return (List<Tipologia>) tipologiaRepository.findAll();
	}
	public List<Tipologia> getValidi() {
		return (List<Tipologia>) tipologiaRepository.findAll()
				.stream()
				.filter(account -> isValid(account))
				.collect(Collectors.toList());
	}

	public Boolean isValid(Tipologia tipologia) {
		return tipologia.getDataFine() == null;
	}
	public void deleteTipologia(Integer id) throws SerialException, SQLException {
		SpesaDto spesa = new SpesaDto();
		Tipologia tipologia = findyById(id);
		spesa.setTipologia(tipologia);
		List<Spesa> listaSpese = spesaService.ricercaByFilter(spesa);
		if(listaSpese!=null && listaSpese.size()>0) {
			tipologia.setDataFine(Utility.getNowSql());
			save(tipologia);
		}else {
		    delete(id);
		}
	}
}
