package it.progetticasa.gestorespese.repositories.spese;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import it.progetticasa.gestorespese.model.spese.Tipologia;

public interface TipologiaRepository extends CrudRepository<Tipologia, Integer> , JpaRepository<Tipologia, Integer> {
	  Tipologia findByNomeTipologia(String nomeTipologia);
}