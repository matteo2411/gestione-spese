package it.progetticasa.gestorespese.repositories.spese;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import it.progetticasa.gestorespese.model.User;
import it.progetticasa.gestorespese.model.spese.Spesa;

public interface SpesaRepository extends CrudRepository<Spesa, Integer>, JpaRepository<Spesa, Integer> {
	List<Spesa> findByUtente(User utente);
	Spesa findTopByOrderByDataContabileDesc();
}