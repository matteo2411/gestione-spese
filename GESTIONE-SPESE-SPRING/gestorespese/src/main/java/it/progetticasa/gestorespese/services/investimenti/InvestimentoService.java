package it.progetticasa.gestorespese.services.investimenti;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.progetticasa.gestorespese.dto.InvestimentoDto;
import it.progetticasa.gestorespese.model.User;
import it.progetticasa.gestorespese.model.investimenti.Investimento;
import it.progetticasa.gestorespese.model.investimenti.StoricoUtenteInvestimento;
import it.progetticasa.gestorespese.model.investimenti.UtenteInvestimento;
import it.progetticasa.gestorespese.repositories.investimenti.InvestimentoRepository;
import it.progetticasa.gestorespese.services.UserService;
import it.progetticasa.gestorespese.utility.Utility;
import lombok.extern.apachecommons.CommonsLog;

@Service
@Transactional
@CommonsLog
public class InvestimentoService {
	@Autowired
	private InvestimentoRepository investimentoRepository;
	@Autowired
	private UtenteInvestimentoService utenteInvestimentoService;
	@Autowired
	private StoricoUtenteInvestimentoService storicoQuoteInvestimentoService;
	@Autowired
	private UserService userService;

	public Investimento save(Investimento investimento) {
		log.info("[SAVE INVESTIMENTO] => "+investimento);
		return investimentoRepository.save(investimento);
	}
	public void delete(Integer id) {
		investimentoRepository.deleteById(id);
	}
	public Investimento findInvestimento(Integer id) {
		return investimentoRepository.findById(id).get();
	}
	public List<Investimento> getAll() {
		return (List<Investimento>) investimentoRepository.findAll();
	}
	public List<Investimento> getValidi() {
		return (List<Investimento>) investimentoRepository.findAll()
				.stream()
				.filter(investimento -> isValid(investimento))
				.collect(Collectors.toList());
	}

	public Boolean isValid(Investimento investimento) {
		return investimento.getDataFine() == null;
	}
	
	public UtenteInvestimento aggiornaInvestimento(InvestimentoDto investimentoDto) throws Exception {
		Double entrata = 0D;
		Double uscita = 0D;
		User user = userService.findByName(investimentoDto.getNomeUtente());
		
		UtenteInvestimento utenteInvestimento = new UtenteInvestimento();
		utenteInvestimento.setUtente(user);
		utenteInvestimento.setInvestimento(new Investimento());
		utenteInvestimento.getInvestimento().setId(investimentoDto.getInvestimento().getId());
		
		Double quotaAttuale = investimentoDto.getInvestimento().getQuotaAttuale();
		if(investimentoDto.getQuotazione()!=null && investimentoDto.getQuotazione()>0D) {
			quotaAttuale = investimentoDto.getQuotazione();
		}
		
		List<UtenteInvestimento> investimentoASistema = utenteInvestimentoService.ricerca(utenteInvestimento);
		if(investimentoASistema != null && investimentoASistema.size() > 0) {
			utenteInvestimento = investimentoASistema.get(0);
		}else {
			utenteInvestimento = new UtenteInvestimento(user, investimentoDto.getInvestimento());
			utenteInvestimento.setDataInizio(Utility.getNowSql());
		}
		if(investimentoDto.getOperazione().equalsIgnoreCase("ACQUISTO")) {
			if(utenteInvestimento.getQuoteTotali()!=null) {
				utenteInvestimento.setQuoteTotali(utenteInvestimento.getQuoteTotali() + investimentoDto.getNrQuote());
			}else {
				utenteInvestimento.setQuoteTotali(investimentoDto.getNrQuote());
			}
			uscita = investimentoDto.getNrQuote() * quotaAttuale;
		}
		else if(investimentoDto.getOperazione().equalsIgnoreCase("VENDITA")) {
			if(utenteInvestimento.getQuoteTotali()==null || investimentoDto.getNrQuote() > utenteInvestimento.getQuoteTotali()) {
				throw new Exception("Le quote da vendere superano quelle attualmente possedute dall'utente!");
			}
			utenteInvestimento.setQuoteTotali(utenteInvestimento.getQuoteTotali() - investimentoDto.getNrQuote());
			entrata = investimentoDto.getNrQuote() * quotaAttuale;
		}
		utenteInvestimento = utenteInvestimentoService.save(utenteInvestimento);
		
		StoricoUtenteInvestimento quoteInvestimento = new StoricoUtenteInvestimento(
				null, utenteInvestimento, investimentoDto.getNrQuote(), quotaAttuale, 
				entrata, uscita, investimentoDto.getDataOperazione(), investimentoDto.getOperazione());
		storicoQuoteInvestimentoService.save(quoteInvestimento);
		
		return utenteInvestimento;
	}
	public List<UtenteInvestimento> getValidiUtente(InvestimentoDto investimentoDto) throws SerialException, SQLException {
		User user = userService.findUser(investimentoDto.getIdUtente());
		UtenteInvestimento utenteInvestimento = new UtenteInvestimento(user, null);
		return utenteInvestimentoService.ricerca(utenteInvestimento);
	}
}
