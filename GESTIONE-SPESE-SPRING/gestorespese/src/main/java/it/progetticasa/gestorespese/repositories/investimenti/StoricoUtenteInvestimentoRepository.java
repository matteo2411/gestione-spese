package it.progetticasa.gestorespese.repositories.investimenti;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import it.progetticasa.gestorespese.model.investimenti.StoricoUtenteInvestimento;

public interface StoricoUtenteInvestimentoRepository extends CrudRepository<StoricoUtenteInvestimento, Integer> , JpaRepository<StoricoUtenteInvestimento, Integer> {

}
