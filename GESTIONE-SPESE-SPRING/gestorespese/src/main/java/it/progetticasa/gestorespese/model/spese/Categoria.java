package it.progetticasa.gestorespese.model.spese;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "GS_CATEGORIA")
@Table(name = "GS_CATEGORIA")
@Getter @Setter
public class Categoria {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;

  @Column(name = "NOME_CATEGORIA", unique = true)
  private String nomeCategoria;
  
  @Column(name = "DATA_FINE")
  private Date dataFine;
  
  @ManyToOne
  private Categoria categoriaPadre;

  @JsonIgnore
  @OneToMany(mappedBy = "categoriaPadre", cascade = CascadeType.REMOVE)
  private Set<Categoria> sottoCategorie = new HashSet<>();
  
}
