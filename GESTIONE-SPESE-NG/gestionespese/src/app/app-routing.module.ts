import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaricaSpeseComponent } from './spese/carica-spese/carica-spese.component';
import { CreaCategoriaComponent } from './spese/crea-categoria/crea-categoria.component';
import { CreaTipologiaComponent } from './spese/crea-tipologia/crea-tipologia.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ListaCategorieComponent } from './spese/lista-categorie/lista-categorie.component';
import { ListaTipologieComponent } from './spese/lista-tipologie/lista-tipologie.component';
import { ScaricaSpeseComponent } from './spese/scarica-spese/scarica-spese.component';
import { CreaUtenteComponent } from './sistema/crea-utente/crea-utente.component';
import { ListaUtentiComponent } from './sistema/lista-utenti/lista-utenti.component';
import { StoricoSpeseComponent } from './spese/storico-spese/storico-spese.component';
import { ListaAccountComponent } from './spese/lista-account/lista-account.component';
import { CreaAccountComponent } from './spese/crea-account/crea-account.component';
import { InvestimentiCreaComponent } from './investimenti/investimenti-crea/investimenti-crea.component';
import { InvestimentiAssociaUtenteComponent } from './investimenti/investimenti-associa-utente/investimenti-associa-utente.component';
import { InvestimentiListaComponent } from './investimenti/investimenti-lista/investimenti-lista.component';
import { InvestimentoListaUtenteComponent } from './investimenti/investimento-lista-utente/investimento-lista-utente.component';
import { CruscottoSpeseComponent } from './spese/cruscotto-spese/cruscotto-spese.component';

const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'spese/carica', component: CaricaSpeseComponent },
  { path: 'spese/lista', component: ScaricaSpeseComponent },
  { path: 'spese/storico', component: StoricoSpeseComponent },
  { path: 'spese/cruscotto', component: CruscottoSpeseComponent },
  { path: 'tipologie/lista', component: ListaTipologieComponent },
  { path: 'tipologie/crea', component: CreaTipologiaComponent },
  { path: 'categorie/lista', component: ListaCategorieComponent },
  { path: 'categorie/crea', component: CreaCategoriaComponent },
  { path: 'account/lista', component: ListaAccountComponent },
  { path: 'account/crea', component: CreaAccountComponent },
  { path: 'utente/crea', component: CreaUtenteComponent },
  { path: 'utente/lista', component: ListaUtentiComponent },
  { path: 'investimenti/crea', component: InvestimentiCreaComponent },
  { path: 'investimenti/associa-utente', component: InvestimentiAssociaUtenteComponent },
  { path: 'investimenti/lista', component: InvestimentiListaComponent },
  { path: 'investimenti/lista-utente', component: InvestimentoListaUtenteComponent },
  { path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }