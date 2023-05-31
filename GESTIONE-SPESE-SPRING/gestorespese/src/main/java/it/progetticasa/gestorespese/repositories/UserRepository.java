package it.progetticasa.gestorespese.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import it.progetticasa.gestorespese.model.User;

public interface UserRepository extends CrudRepository<User, Integer> , JpaRepository<User, Integer> {

	List<User> findByName(String name);

}