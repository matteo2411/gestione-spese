package it.progetticasa.gestorespese.repositories.investimenti;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import it.progetticasa.gestorespese.model.investimenti.UtenteInvestimento;

public interface UtenteInvestimentoRepository extends CrudRepository<UtenteInvestimento, Integer> , JpaRepository<UtenteInvestimento, Integer> {

}
