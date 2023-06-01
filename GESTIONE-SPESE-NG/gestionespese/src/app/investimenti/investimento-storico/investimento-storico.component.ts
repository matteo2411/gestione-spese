import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';

@Component({
  selector: 'app-investimento-storico',
  templateUrl: './investimento-storico.component.html',
  styleUrls: ['./investimento-storico.component.css']
})
export class InvestimentoStoricoComponent {
  private eventsSubscription: Subscription;
  listaInvestimentoStorico : any[] = [];

  @Input() events: Observable<void>;
  @ViewChild('contentstorico', { static: true }) modal: ElementRef;

  constructor(private commonService : CommonDataService, private modalService : NgbModal) {}
  
  ngOnInit(){
    this.eventsSubscription = this.events.subscribe((data) => this.openModal(data));
  }
  
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  openModal(elementoSelezionato : any){
    this.commonService.resetMessages();
    this.commonService.showSpinner();

    let inputJson = {
      "utente": {
        "id": elementoSelezionato.utente.id
      },
      "investimento": {
          "id": elementoSelezionato.investimento.id
      }
    }
    this.listaInvestimentoStorico = [];

    this.commonService.callApiPost(GlobalConstants.listaInvestimentiUtenteStorici, inputJson).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaInvestimentoStorico = data.oggetto;
        const options = { 
          ariaLabelledBy: 'storico-investimento',
          size: 'xl',
          windowClass: 'custom-modal-window', 
          backdropClass: 'custom-modal-backdrop' 
        };
        this.modalService.open(this.modal, options);
      }else{
        this.commonService.addDangerMessage("Errore nel recupero dello storico",true);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero dello storico",true);
    })
  }

}
