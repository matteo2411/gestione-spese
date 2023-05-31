package it.progetticasa.gestorespese.services.spese;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.progetticasa.gestorespese.dto.SpesaDto;
import it.progetticasa.gestorespese.model.spese.Account;
import it.progetticasa.gestorespese.model.spese.Spesa;
import it.progetticasa.gestorespese.repositories.spese.AccountRepository;
import it.progetticasa.gestorespese.utility.Utility;

@Service
@Transactional
public class AccountService {

	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private SpesaService spesaService;

	public Account save(Account account) {
		return accountRepository.save(account);
	}
	public void delete(Integer id) {
		accountRepository.deleteById(id);
	}
	public Account findyById(Integer id) {
		return accountRepository.findById(id).get();
	}
	public List<Account> getAll() {
		return (List<Account>) accountRepository.findAll();
	}
	public List<Account> getValidi() {
		return (List<Account>) accountRepository.findAll()
			.stream()
			.filter(account -> isValid(account))
			.collect(Collectors.toList());
	}
	public List<Account> getStorici() {
		return (List<Account>) accountRepository.findAll()
			.stream()
			.filter(account -> isStorico(account))
			.collect(Collectors.toList());
	}

	public Boolean isValid(Account account) {
		return account.getDataFine() == null;
	}
	public Boolean isStorico(Account account) {
		return account.getDataFine() != null;
	}
	
	public void deleteAccount(Integer id) throws SerialException, SQLException {
		SpesaDto spesa = new SpesaDto();
		  Account account = findyById(id);
		  spesa.setAccount(account);
		  List<Spesa> listaSpese = spesaService.ricercaByFilter(spesa);
		  if(listaSpese!=null && listaSpese.size()>0) {
			  account.setDataFine(Utility.getNowSql());
			  save(account);
		  }else {
			  delete(id);
		  }
	}
}
