package it.progetticasa.gestorespese.services.spese;

import java.sql.SQLException;
import java.util.Comparator;
import java.util.List;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.progetticasa.gestorespese.model.spese.StoricoSpese;
import it.progetticasa.gestorespese.repositories.spese.StoricoSpeseRepository;

@Service
@Transactional
public class StoricoSpeseService {

	@Autowired
	private StoricoSpeseRepository operazioniRepository;

	public StoricoSpese save(StoricoSpese operazione) {
		return operazioniRepository.save(operazione);
	}
	public StoricoSpese findyById(Integer id) {
		return operazioniRepository.findById(id).get();
	}
	public List<StoricoSpese> getAll() {
		return (List<StoricoSpese>) operazioniRepository.findAll();
	}
	public List<StoricoSpese> ricerca(StoricoSpese operazione) throws SerialException, SQLException {
		List<StoricoSpese> storico = operazioniRepository.findAll(Example.of(operazione));
		storico.sort(new Comparator<StoricoSpese>() {
            @Override
            public int compare(StoricoSpese m1, StoricoSpese m2) {
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
