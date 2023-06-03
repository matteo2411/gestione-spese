import { Component, OnInit } from '@angular/core';
import { CommonDataService } from 'src/app/common/common-data.service';
import { GlobalConstants } from 'src/app/globalConstants';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ConfirmEventType, ConfirmationService, MenuItem, MessageService, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-lista-categorie',
  templateUrl: './lista-categorie.component.html',
  styleUrls: ['./lista-categorie.component.css'],
  providers:[MessageService]
})
export class ListaCategorieComponent implements OnInit {

  listaCategorie : any[] = [];
  faTimes = faTimes;

  files: TreeNode[];
  selectedFile: TreeNode;

  constructor(private commonService : CommonDataService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getCategorie(true);

    this.commonService.setBreadcrumbItems([
      { 
        label: 'Spese',
        routerLink: '/spese/lista',
        queryParams: {
          "idParent" : "1",
          "indietro" : "0"
        }
      },{ 
        label: 'Categorie',
        routerLink: '/categorie/lista',
        queryParams: {
          "idParent" : "1-5",
          "indietro" : "0"
        }
      },{ 
        label: 'Lista',
        routerLink: '/categorie/lista',
        queryParams: {
          "idParent" : "1-5",
          "indietro" : "0"
        }
      }
    ]);
  }

  getCategorie(resetMessage : Boolean) : void{
    this.commonService.showSpinner();
    if(resetMessage){
      this.commonService.resetMessages();
    }
    this.commonService.callApiGet(GlobalConstants.listaCategorie).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.listaCategorie = data.oggetto;

        this.files = [];
        this.listaCategorie.map((categoria)=>{
          if(!categoria.categoriaPadre || !categoria.categoriaPadre.id){
            this.files.push(this.buildNode(categoria));
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
    this.listaCategorie.map((categoriaFiglio)=>{
      if(categoriaFiglio.categoriaPadre && categoriaFiglio.categoriaPadre.id === categoria.id){
        children.push(this.buildNode(categoriaFiglio));
      }
    })
    return children;
  }
  
  eliminaCategoria(){
    this.commonService.resetMessages();
    this.confirmationService.confirm({
      message: 'Stai eliminando definitivamente la categoria '+this.selectedFile.data.nomeCategoria+', sicuro di voler procedere? L\'operazione è irreversibile',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cancella(this.selectedFile.data);
      },
      reject: (type: Number) => {
          switch (type) {
              case ConfirmEventType.REJECT:
                  break;
          }
      }
    });
  }

  cancella(categoria : any): void {
    this.commonService.showSpinner();
    this.commonService.callApiDelete(GlobalConstants.eliminaCategoria+categoria.id).subscribe((data)=>{
      this.commonService.hideSpinner();
      if(data.success){
        this.commonService.addSuccessMessage("Categoria "+categoria.nomeCategoria+" eliminata correttamente",false);
        this.getCategorie(false);
      }else{
        this.listaCategorie = [];
        this.commonService.addDangerMessage("Errore nell'eliminazione della categoria "+categoria.nomeCategoria,false);
      }
    },(error)=>{
      this.commonService.hideSpinner();
      this.commonService.addDangerMessage("Errore nell'eliminazione della categoria "+categoria.nomeCategoria,false);
    })
  }

}
