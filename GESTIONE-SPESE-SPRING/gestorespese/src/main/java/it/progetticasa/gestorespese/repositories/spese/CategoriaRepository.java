package it.progetticasa.gestorespese.repositories.spese;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import it.progetticasa.gestorespese.model.spese.Categoria;

public interface CategoriaRepository extends CrudRepository<Categoria, Integer> , JpaRepository<Categoria, Integer> {

}
