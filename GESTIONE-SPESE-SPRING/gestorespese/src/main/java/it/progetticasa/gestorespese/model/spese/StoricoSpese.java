package it.progetticasa.gestorespese.model.spese;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import it.progetticasa.gestorespese.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "GS_STORICO_SPESE")
@Table(name = "GS_STORICO_SPESE")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class StoricoSpese {

	
	  @Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private Integer id;
	  
	  @Column(name = "CATEGORIA")
	  private String categoria;
	  
	  @Column(name = "DESCRIZIONE")
	  private String descrizione;

	  @Column(name = "DATA_OPERAZIONE")
	  @JsonFormat(pattern = "dd-MM-yyyy")
	  private Date dataOperazione;

	  @ManyToOne
	  @JoinColumn(name = "FK_UTENTE")
	  private User utente;
	  
	  @ManyToOne
	  @JoinColumn(name = "FK_ACCOUNT")
	  private Account account;
	  
	  
}
