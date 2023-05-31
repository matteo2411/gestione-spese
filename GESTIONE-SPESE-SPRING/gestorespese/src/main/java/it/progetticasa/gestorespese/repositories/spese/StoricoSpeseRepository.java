package it.progetticasa.gestorespese.repositories.spese;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import it.progetticasa.gestorespese.model.spese.StoricoSpese;

public interface StoricoSpeseRepository extends CrudRepository<StoricoSpese, Integer>, JpaRepository<StoricoSpese, Integer>  {
}