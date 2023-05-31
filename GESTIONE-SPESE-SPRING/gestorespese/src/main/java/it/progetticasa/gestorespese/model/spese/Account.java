package it.progetticasa.gestorespese.model.spese;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "GS_ACCOUNT")
@Table(name = "GS_ACCOUNT")
@Getter @Setter
public class Account {

	  @Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private Integer id;

	  @Column(name = "NOME_ACCOUNT", unique = true)
	  private String nomeAccount;
	  
	  @Column(name = "DATA_FINE")
	  private Date dataFine;
}
