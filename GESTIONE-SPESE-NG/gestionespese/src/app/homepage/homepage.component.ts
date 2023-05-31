import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEuroSign, faAddressBook, faTools, faChartLine, faWallet } from '@fortawesome/free-solid-svg-icons';
import { CommonDataService } from '../common/common-data.service';
import { GlobalConstants } from '../globalConstants';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  faWallet = faWallet;
  faAddressBook = faAddressBook;
  faTools = faTools;
  faChartLine = faChartLine;

  subheader: string = "";
  subheaderInvestimenti: string = "";
  msgCardSpese: string = "";
  msgCardInvestimenti: string = "";

  constructor(public commonService : CommonDataService, public router : Router) { }

  ngOnInit(): void {
    this.commonService.setBreadcrumbItems([]);
    this.controlloSpese();
    this.ricercaInvestimenti();
  }

  controlloSpese(){
    this.commonService.showSpinner();
    this.commonService.resetMessages();
    const input = {
      categoria : 'SPESA'
    }
    this.commonService.callApiPost(GlobalConstants.listaStorico, input).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success && data.oggetto && data.oggetto[0]){
        this.subheader = "Ultimo aggiornamento: "+data.oggetto[0].dataOperazione;
      }else{
        this.subheader = "Ultimo aggiornamento: Non Presente";
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero dei dati di spesa storici",true);
    })
    
    this.commonService.showSpinner();
    this.commonService.callApiGet(GlobalConstants.ultimaSpesa).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success && data.oggetto){
        if(this.controllaGiorni(data.oggetto.dataContabile, new Date(), 30)){
          this.msgCardSpese = "Attenzione, l'ultima spesa caricata risulta essere antecedente ad un mese."+'\n'+" Caricare i dati aggiornati";
        }else{
          this.msgCardSpese = "Le spese risultano correttamente aggiornate";
          this.msgCardSpese += '\n'+"L'ultimo record presente fa riferimento al giorno " + data.oggetto.dataContabile;
        }

      }else{
          this.msgCardSpese = "Attenzione, l'ultima spesa caricata risulta essere antecedente ad un mese."+'\n'+" Caricare i dati aggiornati";
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero dei dati di spesa storici",true);
    })
  }

  ricercaInvestimenti() : void{
    this.commonService.resetMessages();
    this.commonService.showSpinner();

    this.commonService.callApiGet(GlobalConstants.listaInvestimentiValidi).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success && data.oggetto && data.oggetto[0]){
        this.subheaderInvestimenti = "Ultimo aggiornamento: "+data.oggetto[0].dataAggiornamento;
        if(this.controllaGiorni(data.oggetto[0].dataAggiornamento, new Date(), 7)){
          this.msgCardInvestimenti = "Attenzione, l'ultimo aggiornamento risulta essere antecedente ad una settimana."+'\n'+" Caricare i dati aggiornati";
        }else{
          this.msgCardInvestimenti = "Le quote risultano correttamente aggiornate";
          this.msgCardInvestimenti += '\n'+"L'ultimo aggiornamento è stato effettuato il giorno " + data.oggetto[0].dataAggiornamento
        }
      }else{
        this.subheaderInvestimenti = "Ultimo aggiornamento: Non presente";
        this.msgCardInvestimenti = "Attenzione, l'ultimo aggiornamento risulta essere antecedente ad una settimana."+'\n'+" Caricare i dati aggiornati";
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nel recupero dei dati di spesa storici",true);
    })
  }

  controllaGiorni(dataDb : any, dataRiferimento: any, giorni: number){
    if(dataDb == null){
      return true;
    }
    const dbDate = new Date(dataDb.split('-')[1]+"-"+dataDb.split('-')[0]+"-"+dataDb.split('-')[2]);
    const diffTime = dataRiferimento.getTime() - dbDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays > giorni;
  }

  select(tipo : string, url : string){
    this.commonService.appSelezionata = tipo;
    if(url && url.length){
      this.router.navigateByUrl(url);
    }
  }

  clickWidget(tipo : string){
    if(tipo === 'spese'){
      this.router.navigateByUrl("spese/carica?idParent=1&indietro=0")
    }
    if(tipo === 'investimenti'){
      this.router.navigateByUrl("investimenti/lista?idParent=2&indietro=0")
    }
  }

}
