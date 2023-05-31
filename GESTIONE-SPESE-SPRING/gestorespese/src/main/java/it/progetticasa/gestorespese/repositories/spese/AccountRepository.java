package it.progetticasa.gestorespese.repositories.spese;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import it.progetticasa.gestorespese.model.spese.Account;

public interface AccountRepository extends CrudRepository<Account, Integer> , JpaRepository<Account, Integer> {

}
