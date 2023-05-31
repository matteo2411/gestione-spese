package it.progetticasa.gestorespese.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Risposta<T> {
	
	private Boolean success;
	private T oggetto;
	private String messaggioErrore;

}
