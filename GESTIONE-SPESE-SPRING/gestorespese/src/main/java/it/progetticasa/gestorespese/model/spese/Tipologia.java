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

import lombok.Getter;
import lombok.Setter;

@Entity(name = "GS_TIPOLOGIA")
@Table(name = "GS_TIPOLOGIA")
@Getter @Setter
public class Tipologia {

  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;

  @Column(name = "NOME_TIPOLOGIA" , unique = true)
  private String nomeTipologia;
  
  @Column(name = "DATA_FINE")
  private Date dataFine;
  
  @ManyToOne
  @JoinColumn(name = "FK_CATEGORIA")
  private Categoria categoria;

}
