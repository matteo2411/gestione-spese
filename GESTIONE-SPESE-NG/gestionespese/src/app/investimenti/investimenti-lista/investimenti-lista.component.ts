import { Component, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-investimenti-lista',
  templateUrl: './investimenti-lista.component.html',
  styleUrls: ['./investimenti-lista.component.css']
})
export class InvestimentiListaComponent implements OnInit {

  listaInvestimenti : any[] = [];
  editForm : UntypedFormGroup = new UntypedFormGroup({
    quotazione : new UntypedFormControl(null, Validators.required),
    link : new UntypedFormControl(null, Validators.required)
  });

  constructor(private commonService : CommonDataService, 
              private router : Router,
              private confirmationService : ConfirmationService,
              private modalService : NgbModal) { }

  ngOnInit(): void {
    this.ricercaInvestimenti();

    this.commonService.setBreadcrumbItems([
      { 
        label: 'Investimenti',
        routerLink: '/investimenti/lista',
        queryParams: {
          "idParent" : "2",
          "indietro" : "0"
        }
      },{ 
        label: 'Lista',
        routerLink: '/investimenti/lista',
        queryParams: {
          "idParent" : "2",
          "indietro" : "0"
        }
      }
    ]);
  }

  ricercaInvestimenti() : void{
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiGet(GlobalConstants.listaInvestimentiValidi).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaInvestimenti = data.oggetto;
      }else{
        this.listaInvestimenti = [];
        this.commonService.addDangerMessage("Errore nel recupero degli investimenti a sistema",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero degli investimenti a sistema",true);
    })
  }

  
  cancella(investimento : any): void {
    this.confirmationService.confirm({
      message: 'Stai eliminando definitivamente il fondo d\'investimento '+investimento.nomeInvestimento+', sicuro di voler procedere? L\'operazione è irreversibile',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eseguiCancella(investimento.id);
      },
      reject: (type: Number) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  break;
          }
      }
    });
  }

  eseguiCancella(id : number): void {
    this.commonService.resetMessages();
    this.commonService.showSpinner();
    this.commonService.callApiDelete(GlobalConstants.eliminaInvestimento+id).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.commonService.addSuccessMessage("Investimento eliminato correttamente",true);
        this.ricercaInvestimenti();
      }else{
        this.commonService.addDangerMessage("Errore nell'eliminazione dell'investimento",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nell'eliminazione dell'investimento",true);
    })
  }

  crea(){
    this.router.navigateByUrl("/investimenti/crea");
  }

  open(content : any, elementoSelezionato : any) {

    console.log(elementoSelezionato);
    
    this.editForm.patchValue({
      quotazione : elementoSelezionato.quotaAttuale,
      link   : elementoSelezionato.url
    })
    
    const options = { 
      ariaLabelledBy: 'aggiorna-quotazione',
      size: 'lg',
      windowClass: 'custom-modal-window', 
      backdropClass: 'custom-modal-backdrop' 
    };
    this.modalService.open(content, options).result.then((result : any) => {
      console.log(elementoSelezionato);
      if(result === 'Salva'){
        elementoSelezionato.quotaAttuale = this.editForm.value.quotazione;
        elementoSelezionato.url = this.editForm.value.link
        this.commonService.showSpinner();
        this.commonService.resetMessages();
        this.commonService.callApiPut(GlobalConstants.aggiornaInvestimento, elementoSelezionato).subscribe((data)=>{
          this.commonService.hideSpinner();
          if(data.success){
            this.commonService.addSuccessMessage("Investimento aggiornato correttamente",true);
            this.ricercaInvestimenti();
          }else{
            this.commonService.addDangerMessage("Errore nell'aggiornamento dell'investimento",true);
          }
        },(error)=>{
          this.commonService.hideSpinner();
          this.commonService.addDangerMessage("Errore nell'aggiornamento dell'investimento",true);
        })
      }
    }, () => {
    });
  }

  link(elementoSelezionato : any) {
    window.open(elementoSelezionato.url,"_blank");
  }

}
