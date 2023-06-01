package it.progetticasa.gestorespese.model.spese;

import java.sql.Clob;
import java.sql.Date;
import java.sql.SQLException;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.sql.rowset.serial.SerialClob;
import javax.sql.rowset.serial.SerialException;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;

import com.fasterxml.jackson.annotation.JsonFormat;

import it.progetticasa.gestorespese.dto.SpesaDto;
import it.progetticasa.gestorespese.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "GS_SPESA")
@Table(name = "GS_SPESA")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Spesa implements Comparable {
	
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;

  @Column(name = "DATA_CONTABILE")
  @JsonFormat(pattern = "dd-MM-yyyy")
  private Date dataContabile;
  @Column(name = "DATA_VALUTA")
  @JsonFormat(pattern = "dd-MM-yyyy")
  private Date dataValuta;
  @Column(name = "ENTRATE")
  private Double entrate;
  @Column(name = "USCITE")
  private Double uscite;
  @Column(name = "DESCRIZIONE")
  private String descrizione;
  @Column(name = "DESCRIZIONE_CUSTOM")
  private String descrizioneCustom;
  @Column(name = "DESCRIZIONE_ESTESA")
  @Lob
  private Clob descrizioneEstesa;

  @ManyToOne
  @JoinColumn(name = "FK_TIPOLOGIA")
  private Tipologia tipologia;
  @ManyToOne
  @JoinColumn(name = "FK_UTENTE")
  private User utente;
  @ManyToOne
  @JoinColumn(name = "FK_ACCOUNT")
  private Account account;

  @ManyToOne
  @JoinColumn(name = "FK_CATEGORIA_SCELTA")
  private Categoria categoriaScelta;
  
  public Spesa(SpesaDto spesaDto) throws SerialException, SQLException {
	  this.id = spesaDto.getId();
	  this.dataContabile = spesaDto.getDataContabile();
	  this.dataValuta = spesaDto.getDataValuta();
	  this.entrate = spesaDto.getEntrate();
	  this.uscite = spesaDto.getUscite();
	  this.descrizione = spesaDto.getDescrizione();
	  this.descrizioneCustom = spesaDto.getDescrizioneCustom();
	  if(spesaDto.getDescrizioneEstesa()!=null) {
		  this.descrizioneEstesa = new SerialClob(spesaDto.getDescrizioneEstesa().toCharArray());
	  }
	  if(spesaDto.getUtente() != null) {
		  this.utente = spesaDto.getUtente();
	  }
	  if(spesaDto.getAccount() != null) {
		  this.account = spesaDto.getAccount();
	  }
	  this.categoriaScelta = spesaDto.getCategoriaScelta();
  }

	@Override
	public int compareTo(Object o) {
		Spesa s = (Spesa)o;
		if(this.dataContabile.after(s.getDataContabile())) {
			return -1;
		}else if(s.getDataContabile().after(this.dataContabile)) {
			return 1;
		}else {
			return 0;
		}
	}

}
