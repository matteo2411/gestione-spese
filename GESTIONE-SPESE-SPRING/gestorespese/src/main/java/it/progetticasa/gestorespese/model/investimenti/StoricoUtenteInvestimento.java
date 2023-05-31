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
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "GS_STORICO_UTENTE_INVESTIMENTO")
@Table(name = "GS_STORICO_UTENTE_INVESTIMENTO")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class StoricoUtenteInvestimento {
	
	  @Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private Integer id;
	  
	  @ManyToOne
	  @JoinColumn(name = "FK_UTENTE_INVESTIMENTO")
	  private UtenteInvestimento utenteInvestimento;
	  
	  @Column(name = "NR_QUOTE")
	  private Double nrQuote;
	  
	  @Column(name = "QUOTAZIONE")
	  private Double quotazione;
	  
	  @Column(name = "ENTRATA")
	  private Double entrata;
	  
	  @Column(name = "USCITA")
	  private Double uscita;
	  
	  @Column(name = "DATA_INVESTIMENTO")
	  @JsonFormat(pattern = "dd-MM-yyyy")
	  private Date dataOperazione;
	  
	  @Column(name = "OPERAZIONE")
	  @Pattern(regexp = "ACQUISTO|VENDITA|SOLO ASSOCIAZIONE")
	  private String operazione;
	  
}
