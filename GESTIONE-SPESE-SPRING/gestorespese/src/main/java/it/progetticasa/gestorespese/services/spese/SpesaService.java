package it.progetticasa.gestorespese.services.spese;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.progetticasa.gestorespese.dto.SpesaDto;
import it.progetticasa.gestorespese.dto.SpesaMeseDto;
import it.progetticasa.gestorespese.model.spese.Spesa;
import it.progetticasa.gestorespese.model.spese.StoricoSpese;
import it.progetticasa.gestorespese.model.spese.Tipologia;
import it.progetticasa.gestorespese.repositories.spese.SpesaRepository;
import it.progetticasa.gestorespese.utility.Utility;

@Service
@Transactional
public class SpesaService {
	
	@Autowired
	private SpesaRepository spesaRepository;
    @Autowired
    private TipologiaService tipologiaService;
    @Autowired
    private StoricoSpeseService storicoService;

	public Spesa save(Spesa spesa) {
		return spesaRepository.save(spesa);
	}
	public void delete(Integer id) {
		spesaRepository.deleteById(id);
	}
	public Spesa findLast() {
		return spesaRepository.findTopByOrderByDataContabileDesc();
	}
	public Spesa findyById(Integer id) {
		return spesaRepository.findById(id).get();
	}
	public List<Spesa> getAll() {
		return (List<Spesa>) spesaRepository.findAll();
	}
	public List<Spesa> ricerca(SpesaDto spesaDto) throws SerialException, SQLException {
		Spesa spesaAsProbe = new Spesa(spesaDto);
        return spesaRepository.findAll(Example.of(spesaAsProbe));
    }

	public List<Spesa> ricercaByFilter(SpesaDto spesaFilter) throws SerialException, SQLException {
		String descrizione = spesaFilter.getDescrizione();
		spesaFilter.setDescrizione(null);
		Spesa spesaAsProbe = new Spesa(spesaFilter);
        return spesaRepository.findAll(Example.of(spesaAsProbe))
        		.stream()
        		.filter(spesa -> filterDate(spesa, spesaFilter))
        		.filter(spesa -> filterDescrizione(spesa, descrizione))
        	    .sorted()
        		.collect(Collectors.toList());
    }
	public SpesaMeseDto spesePerMese(int mese, SpesaMeseDto spesaInput) throws ParseException, SerialException, SQLException {
		SpesaDto spesaFilter = new SpesaDto();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		spesaFilter.setDataContabileDa(Utility.convertDate(sdf.parse("01/"+mese+"/"+spesaInput.getAnno())));
		spesaFilter.setDataContabileA(Utility.convertDate(sdf.parse("31/"+mese+"/"+spesaInput.getAnno())));
		Spesa spesaAsProbe = new Spesa(spesaInput);
        List<Spesa> list = spesaRepository.findAll(Example.of(spesaAsProbe))
        		.stream()
        		.filter(spesa -> filterDate(spesa, spesaFilter))
        	    .sorted()
        		.collect(Collectors.toList());
        SpesaMeseDto spesaReturn = new SpesaMeseDto(mese);
        spesaReturn.setEntrate(0D);
        spesaReturn.setUscite(0D);
        for(Spesa spesa : list) {
        	if(spesa.getEntrate()!=null) {
        		spesaReturn.setEntrate(spesaReturn.getEntrate() + spesa.getEntrate());
        	}
        	if(spesa.getUscite()!=null) {
        		spesaReturn.setUscite(spesaReturn.getUscite() + spesa.getUscite());
        	}
        }
        return spesaReturn;
	}

	public Boolean filterDate(Spesa spesa, SpesaDto spesaDto) {
		Boolean result = true;
		if(spesaDto.getDataContabileA() != null) {
			result = Utility.beforeOrEquals(spesaDto.getDataContabileA(), spesa.getDataContabile());
		}
		if(spesaDto.getDataContabileDa() != null) {
			result = result && Utility.afterOrEquals(spesaDto.getDataContabileDa(), spesa.getDataContabile());
		}
		if(spesaDto.getDataValutaA() != null) {
			result = result && Utility.beforeOrEquals(spesaDto.getDataValutaA(), spesa.getDataValuta());
		}
		if(spesaDto.getDataValutaDa() != null) {
			result = result && Utility.afterOrEquals(spesaDto.getDataValutaDa(), spesa.getDataValuta());
		}
		return result;
	}
	
	public Boolean filterDescrizione(Spesa spesa, String descrizione) {
		Boolean result = true;
		if(descrizione != null && spesa.getDescrizione()!=null) {
			result = spesa.getDescrizione().toUpperCase().contains(descrizione.toUpperCase());
		}
		return result;
	}
	public void creaLista(List<SpesaDto> spese) throws Exception {
		if(spese == null || spese.get(0) == null || spese.get(0).getAccount() == null || spese.get(0).getUtente() == null) {
			  throw new Exception("Ci sono alcuni dati mancanti!");
		}
		String descrizione = "CARICAMENTO SPESE";
		if(spese.get(0).getDescrizioneFile() != null && !spese.get(0).getDescrizioneFile().equalsIgnoreCase("")) {
			descrizione = spese.get(0).getDescrizioneFile();
		}
		  
		for(SpesaDto spesaDto : spese) {
		 	Spesa spesa = new Spesa(spesaDto);
		 	Tipologia tipologiaSpesa = tipologiaService.findByName(spesa.getDescrizione()); 
		 	if(tipologiaSpesa == null && spesaDto.getTipologia() == null) {
			  tipologiaSpesa = new Tipologia();
			  tipologiaSpesa.setNomeTipologia(spesa.getDescrizione());
			  tipologiaSpesa.setCategoria(spesaDto.getCategoriaScelta());
		 	}
		 	spesa.setTipologia(tipologiaSpesa);
		 	save(spesa);
		}
		  
		StoricoSpese storico = new StoricoSpese();
		storico.setCategoria("SPESA");
		storico.setDataOperazione(Utility.getNowSql());
		storico.setDescrizione(descrizione);
		storico.setAccount(spese.get(0).getAccount());
		storico.setUtente(spese.get(0).getUtente());
		storicoService.save(storico);
	}
}
