package it.progetticasa.gestorespese.repositories.investimenti;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import it.progetticasa.gestorespese.model.investimenti.Investimento;

public interface InvestimentoRepository extends CrudRepository<Investimento, Integer> , JpaRepository<Investimento, Integer> {

}
