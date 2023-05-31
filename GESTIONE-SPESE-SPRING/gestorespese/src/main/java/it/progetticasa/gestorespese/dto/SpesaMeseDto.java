package it.progetticasa.gestorespese.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class SpesaMeseDto extends SpesaDto {

	private Integer anno;
    private String mese;
    
    public SpesaMeseDto(int mese) {
		if(mese == 1) {
			this.mese = "Gennaio";
		}
		else if(mese == 2) {
			this.mese = "Febbraio";
		}
		else if(mese == 3) {
			this.mese = "Marzo";
		}
		else if(mese == 4) {
			this.mese = "Aprile";
		}
		else if(mese == 5) {
			this.mese = "Maggio";
		}
		else if(mese == 6) {
			this.mese = "Giugno";
		}
		else if(mese == 7) {
			this.mese = "Luglio";
		}
		else if(mese == 8) {
			this.mese = "Agosto";
		}
		else if(mese == 9) {
			this.mese = "Settembre";
		}
		else if(mese == 10) {
			this.mese = "Ottobre";
		}
		else if(mese == 11) {
			this.mese = "Novembre";
		}
		else if(mese == 12) {
			this.mese = "Dicembre";
		}
	}

}
