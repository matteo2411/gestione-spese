package it.progetticasa.gestorespese.services.investimenti;

import java.sql.SQLException;
import java.util.Comparator;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.progetticasa.gestorespese.model.investimenti.StoricoUtenteInvestimento;
import it.progetticasa.gestorespese.model.spese.StoricoSpese;
import it.progetticasa.gestorespese.repositories.investimenti.StoricoUtenteInvestimentoRepository;

@Service
@Transactional
public class StoricoUtenteInvestimentoService {
	@Autowired
	private StoricoUtenteInvestimentoRepository quoteInvestimentoRepository;

	public StoricoUtenteInvestimento save(StoricoUtenteInvestimento quoteInvestimento) {
		return quoteInvestimentoRepository.save(quoteInvestimento);
	}
	public void delete(Integer id) {
		quoteInvestimentoRepository.deleteById(id);
	}
	public StoricoUtenteInvestimento findInvestimento(Integer id) {
		return quoteInvestimentoRepository.findById(id).get();
	}
	public List<StoricoUtenteInvestimento> getAll() {
		return (List<StoricoUtenteInvestimento>) quoteInvestimentoRepository.findAll();
	}
	public List<StoricoUtenteInvestimento> ricerca(StoricoUtenteInvestimento asProbe) throws SerialException, SQLException {
		List<StoricoUtenteInvestimento> storico = quoteInvestimentoRepository.findAll(Example.of(asProbe));
        storico.sort(new Comparator<StoricoUtenteInvestimento>() {
            @Override
            public int compare(StoricoUtenteInvestimento m1, StoricoUtenteInvestimento m2) {
                if(m1.getDataOperazione().after(m2.getDataOperazione())){
                    return -1;
                }else {
                	return 1;
                }
             }
        });
		return storico;
    }
}
