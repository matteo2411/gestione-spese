package it.progetticasa.gestorespese.services;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.progetticasa.gestorespese.dto.SpesaDto;
import it.progetticasa.gestorespese.model.User;
import it.progetticasa.gestorespese.model.spese.Spesa;
import it.progetticasa.gestorespese.repositories.UserRepository;
import it.progetticasa.gestorespese.services.spese.SpesaService;
import it.progetticasa.gestorespese.utility.Utility;

@Service
@Transactional
public class UserService{
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SpesaService spesaService;

	public User save(User user) {
		return userRepository.save(user);
	}
	public void delete(Integer id) {
		userRepository.deleteById(id);
	}
	public User findUser(Integer id) {
		return userRepository.findById(id).get();
	}
	public User findByName(String name) {
		List<User> users = userRepository.findByName(name);
		if(users!=null && users.size()>0) {
			return users.get(0);
		}
		return null;
	}
	public List<User> getAll() {
		return (List<User>) userRepository.findAll();
	}
	public List<User> getValidi() {
		return (List<User>) userRepository.findAll()
				.stream()
				.filter(user -> isValid(user))
				.collect(Collectors.toList());
	}

	public Boolean isValid(User user) {
		return user.getDataFine() == null;
	}
	public void deleteUser(Integer id) throws SerialException, SQLException {
		SpesaDto spesa = new SpesaDto();
		User user = findUser(id);
		spesa.setUtente(user);
		List<Spesa> listaSpese = spesaService.ricercaByFilter(spesa);
		if(listaSpese!=null && listaSpese.size()>0) {
			user.setDataFine(Utility.getNowSql());
			save(user);
		}else {
			delete(id);
		}
	}
}
