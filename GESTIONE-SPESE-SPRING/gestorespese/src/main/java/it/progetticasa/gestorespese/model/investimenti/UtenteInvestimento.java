package it.progetticasa.gestorespese.model.investimenti;

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
import lombok.Getter;
import lombok.Setter;

@Entity(name = "GS_UTENTE_INVESTIMENTO")
@Table(name = "GS_UTENTE_INVESTIMENTO")
@Getter @Setter
public class UtenteInvestimento {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
    
	@ManyToOne
	@JoinColumn(name = "FK_UTENTE")
	private User utente;
  
	@ManyToOne
	@JoinColumn(name = "FK_INVESTIMENTO")
	private Investimento investimento;
	
	@Column(name = "QUOTE_TOTALI")
	private Double quoteTotali;
  
    @Column(name = "DATA_INIZIO")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date dataInizio;
  
    @Column(name = "DATA_FINE")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date dataFine;

	public UtenteInvestimento() {
		super();
	}

	public UtenteInvestimento(User utente, Investimento investimento) {
		super();
		this.utente = utente;
		this.investimento = investimento;
	}
	  
	  
}
