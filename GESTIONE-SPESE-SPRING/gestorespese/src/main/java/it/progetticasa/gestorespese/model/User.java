package it.progetticasa.gestorespese.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "GS_UTENTE")
@Table(name = "GS_UTENTE")
@Getter @Setter
public class User {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;
  
  @Column(name = "NOME_UTENTE", unique = true)
  private String name;
  
  @Column(name = "DATA_FINE")
  private Date dataFine;

  @Column(name = "EMAIL_UTENTE")
  private String email;

}