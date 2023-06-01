import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { faArrowLeft, faCalendarAlt, faChartPie, faFileExcel, faFilter, faSearch, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmEventType, ConfirmationService, MegaMenuItem, MessageService } from 'primeng/api';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-scarica-spese',
  templateUrl: './scarica-spese.component.html',
  styleUrls: ['./scarica-spese.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ScaricaSpeseComponent implements OnInit {

  listaUtenti : any[] = []; 
  listaSpese : any[] = []; 
  listaSpeseVisibile : any[] = []; 
  listaCategorieAll : any[] = []; 
  listaCategorie : any[] = []; 
  listaAccount : any[] = []; 
  
  faFilter = faFilter;
  faSearch = faSearch;
  faChartPie = faChartPie;
  faCalendar = faCalendarAlt;
  faExcel = faFileExcel;
  faBack = faArrowLeft;
  faTimes = faTimes;
  faEdit = faEdit;

  page = 1;
  pageSize = 6;
  listaSize = 0;
  dataContabileForm = '';
  dataValutaForm = '';

  listaSpeseForm = new UntypedFormGroup({
    utenteForm: new UntypedFormControl(""),
    categoriaForm: new UntypedFormControl(""),
    accountForm: new UntypedFormControl(""),
    meseForm: new UntypedFormControl(""),
    dataContabileDa: new UntypedFormControl(),
    dataContabileA: new UntypedFormControl(),
    dataValutaDa: new UntypedFormControl(),
    dataValutaA: new UntypedFormControl(),
    descrizione: new UntypedFormControl(),
  })

  meseForm = "";
  anniForm = "";
  anniLista : Number[] = [];

  totaleSpese : any = 0;

  labelsGrafico : any[] = [];
  datiGrafico : any[]  = [];

  constructor(private commonService : CommonDataService,
              public location: Location,
              private modalService: NgbModal,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUtenti();
    this.getAccounts();
    this.getCategorie();
    this.getAnni();

    this.commonService.setBreadcrumbItems([
      { 
        label: 'Spese',
        routerLink: '/spese/lista',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      },{ 
        label: 'Lista',
        routerLink: '/spese/lista',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      }
    ]);
  }

  getAnni(){
    let currentYear = new Date().getFullYear();
    for(let i=0; i<6; i++){
      this.anniLista.push(currentYear-i);
    }
  }

  getAccounts() : void{
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    this.commonService.callApiGet(GlobalConstants.listaAccount).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaAccount = data.oggetto;
      }else{
        this.listaAccount = [];
        this.commonService.addDangerMessage("Errore nel recupero degli account",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero degli account",true);
    })
  }

  getUtenti() : void{
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    this.commonService.callApiGet(GlobalConstants.listaUtenti).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaUtenti = data.oggetto;
      }else{
        this.listaUtenti = [];
        this.commonService.addDangerMessage("Errore nel recupero degli utenti",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero degli utenti",true);
    })
  }

  getCategorie() : void{
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    this.commonService.callApiGet(GlobalConstants.listaCategorie).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
      this.commonService.hideSpinner();
        this.labelsGrafico = [];
        this.listaCategorieAll = data.oggetto;
        this.listaCategorieAll.map((item: any)=>{
          if(!item.categoriaPadre || !item.categoriaPadre.id){
            this.listaCategorie.push(this.buildNode(item));
          }
          this.labelsGrafico.push(item.nomeCategoria);
          this.datiGrafico.push(0);
        })
      }else{
        this.listaCategorie = [];
        this.listaCategorieAll = [];
        this.commonService.addDangerMessage("Errore nel recupero delle categorie",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero delle categorie",true);
    })
  }

  ricerca() : void{
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    const values = this.listaSpeseForm.value;

    const input = {
      utente : this.listaUtenti.filter((item)=> item.id == this.listaSpeseForm.value.utenteForm)[0],
      categoriaScelta : (this.listaSpeseForm.value.categoriaForm)?this.listaSpeseForm.value.categoriaForm.data:null,
      account : this.listaAccount.filter((item)=> item.id == this.listaSpeseForm.value.accountForm)[0],
      dataContabileDa : values.dataContabileDa,
      dataContabileA : values.dataContabileA,
      dataValutaDa : values.dataValutaDa,
      dataValutaA : values.dataValutaA,
      descrizione : values.descrizione
    }
    this.commonService.callApiPost(GlobalConstants.ricercaSpese, input).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaSpese = data.oggetto;
        this.listaSize = this.listaSpese.length;
        this.refreshData(true);
        this.totaleSpese = 0;
        this.datiGrafico=[];
        this.listaCategorieAll.map((item)=>{
          this.datiGrafico.push(0);
        })
        this.listaSpese.map((item)=>{
          this.totaleSpese = this.totaleSpese - item.entrate;
          this.totaleSpese = this.totaleSpese + item.uscite;
          const index = this.labelsGrafico.findIndex((label)=> label === item.categoriaScelta?.nomeCategoria);
          this.datiGrafico[index] = this.datiGrafico[index] + item.uscite - item.entrate;
        })
        if(!this.listaSpese || !this.listaSpese.length){
          this.commonService.addDangerMessage("Nessuna spesa trovata con i criteri scelti",true);
        }
      }else{
        this.listaSpese = [];
        this.listaSize = 0;
        this.totaleSpese = 0;
        this.commonService.addDangerMessage("Errore nel recupero delle spese",true);
        this.refreshData(true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero delle spese",true);
    })
  }

  refreshData(onlyRefresh : any) {
    this.listaSpeseVisibile = this.listaSpese
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(content : any) {
    const options = { 
      ariaLabelledBy: 'grafico-spese',
      size: 'lg',
      windowClass: 'custom-modal-window', 
      backdropClass: 'custom-modal-backdrop' 
    };
    this.modalService.open(content, options);
  }

  resetCampi(){
    this.listaSpeseForm.patchValue({
      utenteForm: "",
      categoriaForm: "",
      accountForm: "",
      meseForm: "",
      dataContabileDa: null,
      dataContabileA: null,
      dataValutaDa: null,
      dataValutaA: null
    })
  }

  changeSelectGrafico(event : any){
    const accountId = event.target.value;

    this.datiGrafico=[];
    this.listaCategorieAll.map((item)=>{
      this.datiGrafico.push(0);
    })
    this.listaSpese.map((item)=>{
      if(item.account.id == accountId || !accountId || !accountId.length){
        this.totaleSpese = this.totaleSpese - item.entrate;
        this.totaleSpese = this.totaleSpese + item.uscite;
        const index = this.labelsGrafico.findIndex((label)=> label === item.categoriaScelta?.nomeCategoria);
        this.datiGrafico[index] = this.datiGrafico[index] + item.uscite - item.entrate;
      }
    })
  }

  buildNode(categoria: any){
    return {
      icon: 'pi pi-folder',
      label: categoria.nomeCategoria,
      data: categoria,
      children: this.buildChildren(categoria)
    };
  }

  buildChildren(categoria: any){
    let children : any[] = [];
    this.listaCategorieAll.map((categoriaFiglio)=>{
      if(categoriaFiglio.categoriaPadre && categoriaFiglio.categoriaPadre.id === categoria.id){
        children.push(this.buildNode(categoriaFiglio));
      }
    })
    return children;
  }

  modifica(spesa: any){

  }

  cancella(spesa: any){
    let descrizione = spesa.descrizioneCustom || spesa.descrizione;

    this.confirmationService.confirm({
      message: 'Stai eliminando definitivamente la spesa '+descrizione+' del giorno '+spesa.dataContabile+', sicuro di voler procedere? L\'operazione è irreversibile',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commonService.showSpinner();
        this.commonService.callApiDelete(GlobalConstants.deleteSpesa+spesa.id).subscribe((data)=>{
          this.commonService.hideSpinner();
          if(data.success){
            this.commonService.addSuccessMessage("Spesa eliminata correttamente",false);
            var index = this.listaSpese.indexOf(spesa);
            if (index !== -1) {
              this.listaSpese.splice(index, 1);
              this.refreshData(true);
            }
          }else{
            this.commonService.addDangerMessage("Errore nell'eliminazione della spesa ",false);
          }
        },(error)=>{
          this.commonService.hideSpinner();
          this.commonService.addDangerMessage("Errore nell'eliminazione della spesa ",false);
        })
      },
      reject: (type: Number) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  break;
          }
      }
    });
  }
}
