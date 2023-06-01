import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { faCloudDownloadAlt, faCommentDots, faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-carica-spese',
  templateUrl: './carica-spese.component.html',
  styleUrls: ['./carica-spese.component.css']
})
export class CaricaSpeseComponent implements OnInit {

  fileToUpload: any = null;
  formData: FormData = new FormData();
  listaSpese: any[] = [];
  listaCategorieAll : any[] = []; 
  listaCategorie : any[] = []; 
  listaTipologie : any[] = []; 
  listaUtenti : any[] = []; 
  listaAccount : any[] = []; 
  elementoSelezionato : any = {};

  faComment = faCommentDots;
  faDownload = faCloudDownloadAlt;
  inserimento = false;

  caricaSpeseForm = new UntypedFormGroup({
    utenteForm: new UntypedFormControl("", Validators.required),
    accountForm: new UntypedFormControl("", Validators.required),
    fileForm: new UntypedFormControl(null),
    descrizioneForm: new UntypedFormControl("")
  })

  descrizionePersonaleForm = new UntypedFormGroup({
    descrizionePersonale: new UntypedFormControl(null)
  })

  constructor(private commonService : CommonDataService,
              private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.inserimento = false;
    this.getUtenti();
    this.getAccounts();
    this.getCategorie();
    this.getTipologie();

    this.commonService.setBreadcrumbItems([
      { 
        label: 'Spese',
        routerLink: '/spese/lista',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      },{ 
        label: 'Carica',
        routerLink: '/spese/carica',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      }
    ]);
  }

  downloadTemplate(): void{
    window.open(
      GlobalConstants.downloadTemplateSpese,
      '_blank' 
    );
  }

  getAccounts() : void{
    this.commonService.resetMessages();
    this.commonService.showSpinner();
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
    this.commonService.resetMessages();
    this.commonService.showSpinner();
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
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiGet(GlobalConstants.listaCategorie).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaCategorieAll = data.oggetto;
        this.listaCategorieAll.map((item: any)=>{
          if(!item.categoriaPadre || !item.categoriaPadre.id){
            this.listaCategorie.push(this.buildNode(item));
          }
        })
      }else{
        this.listaCategorie = [];
        this.commonService.addDangerMessage("Errore nel recupero delle categorie",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero delle categorie",true);
    })
  }

  getTipologie() : void{
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiGet(GlobalConstants.listaTipologie).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaTipologie = data.oggetto;
      }else{
        this.listaCategorie = [];
        this.commonService.addDangerMessage("Errore nel recupero delle categorie",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero delle categorie",true);
    })
  }

  cercaInTipologia(nomeTipologia : any) : any {
    let tipologiaSel = null;
    this.listaTipologie.map((tipologia)=>{
      if(tipologia.nomeTipologia.indexOf(nomeTipologia)>-1){
        tipologiaSel = tipologia;
      }
    })
    return tipologiaSel;
  }

  handleFileInput(event: any){
    this.listaSpese = [];
    this.formData = new FormData();
    this.formData.append("file", event.target.files[0]);
  }

  inserisciManualmente(){
    this.inserimento = true;
  }

  aggiungiRiga(){
    this.listaSpese.push({
      editable : true,
      dataContabile : '',
      dataValuta : '',
      descrizione : '',
      descrizioneEstesa : '',
      entrate : '',
      uscite : ''
    });
    this.caricaSpeseForm.disable();
  }

  editable(id: Number){
    this.listaSpese.map((item, index) => {
      if(index == id){
        item.editable = !item.editable;
      }else{
        item.editable = false;
      }
    })
  }

  elabora(){
    this.commonService.resetMessages();
    this.formData.append("accountId", this.caricaSpeseForm.value.accountForm);
    this.formData.append("utenteId", this.caricaSpeseForm.value.utenteForm);
    this.commonService.showSpinner();
    this.commonService.callApiPost(GlobalConstants.elaboraSpese,this.formData).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.inserimento = true;
        this.caricaSpeseForm.disable();
        this.listaSpese = data.oggetto;

        const elementiDuplicati = this.listaSpese.filter((item)=> item.spesaPresente);
        let indexWithError = '';
        elementiDuplicati.map((item,index)=>{
          this.listaSpese.map((itemComplete,index)=>{
            if(item == itemComplete){
              indexWithError += (++index)+',';
            }
          });
        })
        if(indexWithError && indexWithError.length){
          indexWithError = indexWithError.substring(0,indexWithError.length-1);
          this.commonService.addDangerMessage('La seguenti righe risultano gia presenti: '+indexWithError, true);
        }

        this.listaSpese.map((spesa)=>{
          const tipologiaSel = this.cercaInTipologia(spesa.descrizione);
          if(tipologiaSel!=null && tipologiaSel.categoria!=null){
            spesa.categoriaScelta = this.cercaCategorie(tipologiaSel.categoria.id, this.listaCategorie, null);
          }
        })

      }else{
        this.listaSpese = [];
        this.commonService.addDangerMessage("Errore nell'elaborazione delle spese",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nell'elaborazione delle spese",true);
    })
  }

  cercaCategorie(id : any, lista : any, categoriaRet: any) {
    lista.map((categoria : any)=>{
      if(categoria.data.id == id){
        categoriaRet = categoria;
      }
      if(categoria.children && categoria.children.length){
        categoriaRet = this.cercaCategorie(id, categoria.children, categoriaRet);
      }
    })
    return categoriaRet;
  }

  cercaCategorieFromList(id : any) {
    let categoriaRet = null;
    this.listaCategorieAll.map((categoria : any)=>{
      if(categoria.id == id){
        categoriaRet = categoria;
      }
    })
    console.log(categoriaRet);
    return categoriaRet;
  }
  
  annulla() : void{
    this.inserimento = false;
    this.caricaSpeseForm.patchValue({
      utenteForm: "",
      accountForm: "",
      fileForm: null,
      descrizioneForm: ""
    })
    this.caricaSpeseForm.enable();
    this.listaSpese = [];
    this.commonService.resetMessages();
  }

  cancella(id : number): void {
    this.listaSpese = this.listaSpese.filter((item,index)=>index!==id);
    if(this.listaSpese.length === 0){
      this.commonService.resetMessages();
      this.annulla();
    }
  }

  caricaSpese() : void{
    this.commonService.showSpinner();
    let error = false;
    let indexWithError = '';
    this.listaSpese.map((item, index)=>{
      if(!item.categoriaScelta || !item.categoriaScelta.data){
        error = true;
        indexWithError += (++index)+',';
      }
      if(!item.descrizioneCustom || !item.descrizioneCustom.length){
        item.descrizioneCustom = item.descrizione;
      }
      item.utente = this.listaUtenti.filter((item)=> item.id == this.caricaSpeseForm.value.utenteForm)[0]
      item.account = this.listaAccount.filter((item)=> item.id == this.caricaSpeseForm.value.accountForm)[0]
      item.descrizioneFile = this.caricaSpeseForm.value.descrizioneForm;
      item.categoriaScelta = this.cercaCategorieFromList(item.categoriaScelta.data.id);
    })
    if(!error){
      this.commonService.resetMessages();
      this.commonService.callApiPost(GlobalConstants.caricaSpese,this.listaSpese).subscribe((data)=>{
        this.commonService.hideSpinner();
        if(data.success){
          this.caricaSpeseForm.reset();
          this.caricaSpeseForm.enable();
          this.listaSpese = [];
          this.commonService.addSuccessMessage("Spese caricate correttamente",true);
        }else{
          this.commonService.addDangerMessage("Errore nel caricamento delle spese",true);
        }
      },(error)=>{
        this.commonService.hideSpinner();
        this.commonService.addDangerMessage("Errore nel caricamento delle spese",true);
      })
    }else{
      this.commonService.hideSpinner();
      if(indexWithError && indexWithError.length){
        indexWithError = indexWithError.substring(0,indexWithError.length-1);
      }
      this.commonService.addDangerMessage('La seguenti righe non hanno la categoria associata: '+indexWithError, true);
    }
  }

  open(content : any, elementoSelezionato : any) {
    this.elementoSelezionato = elementoSelezionato;
    this.descrizionePersonaleForm.patchValue({
      "descrizionePersonale" : this.elementoSelezionato.descrizioneCustom
    })
    const options = { 
      ariaLabelledBy: 'aggiorna-descrizione',
      size: 'lg',
      windowClass: 'custom-modal-window', 
      backdropClass: 'custom-modal-backdrop' 
    };
    this.modalService.open(content, options).result.then((result : any) => {
      if(result === 'Salva'){
        this.elementoSelezionato.descrizioneCustom = this.descrizionePersonaleForm.value.descrizionePersonale;
      }
      this.elementoSelezionato = {};
    }, () => {
      this.elementoSelezionato = {};
    });
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
}
