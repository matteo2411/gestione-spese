package it.progetticasa.gestorespese.dto;

import java.io.IOException;
import java.io.Reader;
import java.sql.Date;
import java.sql.SQLException;

import javax.sql.rowset.serial.SerialException;

import com.fasterxml.jackson.annotation.JsonFormat;

import it.progetticasa.gestorespese.model.User;
import it.progetticasa.gestorespese.model.spese.Account;
import it.progetticasa.gestorespese.model.spese.Categoria;
import it.progetticasa.gestorespese.model.spese.Spesa;
import it.progetticasa.gestorespese.model.spese.Tipologia;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class SpesaDto {
	private Integer id;

    @JsonFormat(pattern = "dd-MM-yyyy")
	private Date dataContabile;

    @JsonFormat(pattern = "dd-MM-yyyy")	
    private Date dataValuta;
	
    private Double entrate;
	private Double uscite;
	private String descrizione;
	private String descrizioneFile;
	private String descrizioneEstesa;
	private String descrizioneCustom;
	private Tipologia tipologia;
	private Categoria categoriaScelta;
	private User utente;
	private Account account;

    @JsonFormat(pattern = "dd-MM-yyyy")
	private Date dataContabileDa;
	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date dataContabileA;
	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date dataValutaDa;
    @JsonFormat(pattern = "dd-MM-yyyy")
	private Date dataValutaA;
	
    private Boolean spesaPresente;
	
	public SpesaDto(Spesa spesa) throws SerialException, SQLException, IOException {
		if(spesa!=null) {
			this.id = spesa.getId();
			this.dataContabile = spesa.getDataContabile();
			this.dataValuta = spesa.getDataValuta();
			this.entrate = spesa.getEntrate();
			this.uscite = spesa.getUscite();
			this.descrizione = spesa.getDescrizione();
		    this.descrizioneCustom = spesa.getDescrizioneCustom();
			if(spesa.getDescrizioneEstesa()!=null) {
				try(Reader r = spesa.getDescrizioneEstesa().getCharacterStream()){
					StringBuffer buffer = new StringBuffer();
					int ch;
					while ((ch = r.read())!=-1) {
					   buffer.append(""+(char)ch);
					}
					this.descrizioneEstesa = buffer.toString();
				}
			}else {
				this.descrizioneEstesa = "Descrizione estesa non disponibile";
			}
			if(spesa.getTipologia() != null) {
				this.tipologia = spesa.getTipologia();
			}
			if(spesa.getCategoriaScelta() != null) {
				this.categoriaScelta = spesa.getCategoriaScelta();
			}
			if(spesa.getUtente() != null) {
				this.utente = spesa.getUtente();
			}
			if(spesa.getAccount() != null) {
				this.account = spesa.getAccount();
			}			
		}
	}
}
