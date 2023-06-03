import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule,registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CaricaSpeseComponent } from './spese/carica-spese/carica-spese.component';
import { ScaricaSpeseComponent } from './spese/scarica-spese/scarica-spese.component';
import { ListaTipologieComponent } from './spese/lista-tipologie/lista-tipologie.component';
import { CreaTipologiaComponent } from './spese/crea-tipologia/crea-tipologia.component';
import { ListaCategorieComponent } from './spese/lista-categorie/lista-categorie.component';
import { CreaCategoriaComponent } from './spese/crea-categoria/crea-categoria.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MessageComponent } from './common/message/message.component';
import { CreaUtenteComponent } from './sistema/crea-utente/crea-utente.component';
import { ListaUtentiComponent } from './sistema/lista-utenti/lista-utenti.component';
import { StoricoSpeseComponent } from './spese/storico-spese/storico-spese.component';
import { PiechartComponent } from './common/piechart/piechart.component';
import { CreaAccountComponent } from './spese/crea-account/crea-account.component';
import { ListaAccountComponent } from './spese/lista-account/lista-account.component';
import { InvestimentiCreaComponent } from './investimenti/investimenti-crea/investimenti-crea.component';
import { InvestimentiListaComponent } from './investimenti/investimenti-lista/investimenti-lista.component';
import { InvestimentiAssociaUtenteComponent } from './investimenti/investimenti-associa-utente/investimenti-associa-utente.component';
import { InvestimentoListaUtenteComponent } from './investimenti/investimento-lista-utente/investimento-lista-utente.component';
import { CruscottoSpeseComponent } from './spese/cruscotto-spese/cruscotto-spese.component';
import { SideNavbarComponent } from './common/side-navbar/side-navbar.component';

import localeIT from '@angular/common/locales/it';

import { SpinnerGestioneSpeseComponent } from './common/spinner-gestione-spese/spinner-gestione-spese.component';
import { TooltipModule } from 'primeng/tooltip';
import { MegaMenuModule } from 'primeng/megamenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { InvestimentoStoricoComponent } from './investimenti/investimento-storico/investimento-storico.component';
import { ConfirmationService, MessageService } from 'primeng/api';

registerLocaleData(localeIT);

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  getMonth(month : any) : String {
    if(month>9){
      return ''+month;
    }else{
      return '0'+month;
    }
  }

  getDay(day : any) : String {
    if(day>9){
      return ''+day;
    }else{
      return '0'+day;
    }
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? this.getDay(date.day) + this.DELIMITER + this.getMonth(date.month) + this.DELIMITER + date.year : '';
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  getMonth(month : any) : String {
    if(month>9){
      return ''+month;
    }else{
      return '0'+month;
    }
  }

  getDay(day : any) : String {
    if(day>9){
      return ''+day;
    }else{
      return '0'+day;
    }
  }

  format(date: NgbDateStruct | null): string {
    return date ? this.getDay(date.day) + this.DELIMITER + this.getMonth(date.month) + this.DELIMITER + date.year : '';
  }
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ChartsModule,
    TooltipModule,
    MegaMenuModule,
    BreadcrumbModule,
    CardModule,
    TreeModule,
    TreeSelectModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule
  ],
  declarations: [
    AppComponent,
    CaricaSpeseComponent,
    ScaricaSpeseComponent,
    ListaTipologieComponent,
    CreaTipologiaComponent,
    ListaCategorieComponent,
    CreaCategoriaComponent,
    HomepageComponent,
    MessageComponent,
    CreaUtenteComponent,
    ListaUtentiComponent,
    StoricoSpeseComponent,
    PiechartComponent,
    CreaAccountComponent,
    ListaAccountComponent,
    InvestimentiCreaComponent,
    InvestimentiListaComponent,
    InvestimentiAssociaUtenteComponent,
    InvestimentoListaUtenteComponent,
    CruscottoSpeseComponent,
    SpinnerGestioneSpeseComponent,
    SideNavbarComponent,
    BreadcrumbComponent,
    InvestimentoStoricoComponent
  ],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: LOCALE_ID, useValue: 'it-IT' } ,
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));