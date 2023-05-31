package it.progetticasa.gestorespese.services.investimenti;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import it.progetticasa.gestorespese.dto.SpesaDto;
import it.progetticasa.gestorespese.model.investimenti.UtenteInvestimento;
import it.progetticasa.gestorespese.model.spese.Spesa;
import it.progetticasa.gestorespese.repositories.investimenti.UtenteInvestimentoRepository;

@Service
@Transactional
public class UtenteInvestimentoService {

	@Autowired
	private UtenteInvestimentoRepository utenteInvestimentoRepository;

	public UtenteInvestimento save(UtenteInvestimento utenteInvestimento) {
		return utenteInvestimentoRepository.save(utenteInvestimento);
	}
	public void delete(Integer id) {
		utenteInvestimentoRepository.deleteById(id);
	}
	public UtenteInvestimento findInvestimento(Integer id) {
		return utenteInvestimentoRepository.findById(id).get();
	}
	public List<UtenteInvestimento> ricerca(UtenteInvestimento asProbe) throws SerialException, SQLException {
        return utenteInvestimentoRepository.findAll(Example.of(asProbe));
    }
	public List<UtenteInvestimento> getAll() {
		return (List<UtenteInvestimento>) utenteInvestimentoRepository.findAll();
	}
	public List<UtenteInvestimento> getValidi() {
		return (List<UtenteInvestimento>) utenteInvestimentoRepository.findAll()
				.stream()
				.filter(utenteInvestimento -> isValid(utenteInvestimento))
				.collect(Collectors.toList());
	}

	public Boolean isValid(UtenteInvestimento utenteInvestimento) {
		return utenteInvestimento.getDataFine() == null;
	}
}
	
