package it.progetticasa.gestorespese.model.investimenti;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity(name = "GS_INVESTIMENTO")
@Table(name = "GS_INVESTIMENTO")
@Getter @Setter
@ToString
public class Investimento {

	  @Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private Integer id;

	  @Column(name = "NOME_INVESTIMENTO", unique = true)
	  private String nomeInvestimento;
	  
	  @Column(name = "QUOTA_INVESTIMENTO")
	  private Double quotaAttuale;
	  
	  @Column(name = "DATA_AGGIORNAMENTO")
	  @JsonFormat(pattern = "dd-MM-yyyy")
	  private LocalDate dataAggiornamento;
	  
	  @Column(name = "URL_INVESTIMENTO")
	  private String url;
	  
	  @Column(name = "DATA_INIZIO")
	  @JsonFormat(pattern = "dd-MM-yyyy")
	  private LocalDate dataInizio;
	  
	  @Column(name = "DATA_FINE")
	  @JsonFormat(pattern = "dd-MM-yyyy")
	  private LocalDate dataFine;
}
