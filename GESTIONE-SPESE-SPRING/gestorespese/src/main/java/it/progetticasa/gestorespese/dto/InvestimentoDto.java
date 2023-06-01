package it.progetticasa.gestorespese.dto;

import java.sql.Date;

import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonFormat;

import it.progetticasa.gestorespese.model.investimenti.Investimento;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class InvestimentoDto {
	Investimento investimento;
	Double nrQuote;
	String nomeUtente;
	Integer idUtente;
    @Pattern(regexp = "ACQUISTO|VENDITA| ")
	String operazione = "";
    @JsonFormat(pattern = "dd-MM-yyyy")	
    Date dataOperazione;
	Double quotazione;
}
