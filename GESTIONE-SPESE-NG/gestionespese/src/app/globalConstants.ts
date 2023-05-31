export class GlobalConstants {

    public static elaboraSpese: string = "/gestione-spese-api/file/elabora-spese";
    public static downloadTemplateSpese: string = "/gestione-spese-api/spesa/download-template-spese";
    
    public static caricaSpese: string = "/gestione-spese-api/spesa/crea-lista";
    public static ricercaSpese: string = "/gestione-spese-api/spesa/ricerca";
    public static riepilogoSpese: string = "/gestione-spese-api/spesa/riepilogo-spese";
    public static ultimaSpesa: string = "/gestione-spese-api/spesa/ultima";
    
    public static creaCategoria: string = "/gestione-spese-api/categoria/crea";
    public static listaCategorie: string = "/gestione-spese-api/categoria/get-validi";
    public static listaCategorieRoot: string = "/gestione-spese-api/categoria/get-validi-root";
    public static eliminaCategoria: string = "/gestione-spese-api/categoria/delete/";
    
    public static creaTipologia: string = "/gestione-spese-api/tipologia/crea";
    public static listaTipologie: string = "/gestione-spese-api/tipologia/get-validi";
    public static eliminaTipologia: string = "/gestione-spese-api/tipologia/delete/";
    
    public static creaAccount: string = "/gestione-spese-api/account/crea";
    public static listaAccount: string = "/gestione-spese-api/account/get-validi";
    public static eliminaAccount: string = "/gestione-spese-api/account/delete/";

    public static creaUtente: string = "/gestione-spese-api/utente/crea";
    public static listaUtenti: string = "/gestione-spese-api/utente/get-validi";
    public static getUtenteById: string = "/gestione-spese-api/utente/get/";
    public static eliminaUtente: string = "/gestione-spese-api/utente/delete/";

    public static listaStorico: string = "/gestione-spese-api/storico/ricerca";
    
    public static creaInvestimento: string = "/gestione-spese-api/investimento";
    public static aggiornaInvestimento: string = "/gestione-spese-api/investimento";
    public static eliminaInvestimento: string = "/gestione-spese-api/investimento/";
    public static dettaglioInvestimento: string = "/gestione-spese-api/investimento/";
    public static listaInvestimentiValidi: string = "/gestione-spese-api/investimento/get-all-valid";
    public static listaInvestimentiValidiUtente: string = "/gestione-spese-api/investimento/get-all-valid-utente";
    public static associaInvestimentoUtente: string = "/gestione-spese-api/investimento/salva-investimento-utente";
    public static listaInvestimentiUtenteStorici: string = "/gestione-spese-api/investimento/ricerca-storico";

    public static colonneExcel = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

}