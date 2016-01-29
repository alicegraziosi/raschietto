$( document ).ready(function() {

    localStorage.clear();

    listaGruppiCompleta = [];

    //documenti
    $.when(getDocFromScraping(), getDocFromSparql()).done(function(r1, r2){
        docS = JSON.parse(r1[0]);
        docA = r2[0].results.bindings;

        getDocumenti(docA, docS);
    });


    //gruppi
    getGruppi();


    //inizializzazione elementi layout
    $('[data-tooltip="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').tooltip();
    $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
    });
    $("#uriNuovoDoc").val("");

    $('#bottoniAnnotator').hide();
    $('#insertAutore').css('display', 'none');
    $('#insertAnnoPub').css('display', 'none');
    $('#insertTitolo').css('display', 'none');
    $('#insertURL').css('display', 'none');
    $('#insertDOI').css('display', 'none');
    $('#insertComm').css('display', 'none');
    $('#insertfunzRet').css('display', 'none');
    $('#salvaInsert').attr('disabled', 'disabled');




    var year = new Date().getFullYear();
    for(i = year; i >=  1800; i--){
        $('select#anno').append('<option value="'+i+'">'+i+'</option>');
    }

    var stickyNavTop = $('#secondnav').offset().top;
    var stickyNav = function(){
        var scrollTop = $(window).scrollTop();
        if (scrollTop > stickyNavTop) {
            $('#secondnav').addClass('sticky');
        } else {
            $('#secondnav').removeClass('sticky');
        }
    };
    //stickyNav();
    $(window).scroll(function() {
        stickyNav();
    });


    $('#modalAnnotDoc').on('hide.bs.modal', function(e){
        $('#selectTipoAnnot').val('');
        $('#insertAutore').css('display', 'none');
        $('#insertAnnoPub').css('display', 'none');
        $('#insertTitolo').css('display', 'none');
        $('#insertURL').css('display', 'none');
        $('#insertDOI').css('display', 'none');
        $('#insertComm').css('display', 'none');
        $('#insertfunzRet').css('display', 'none');
    });

    $('#modalAnnotDoc').draggable({
        handle: ".modal-content"
    });

     $('#modalAnnotCit').draggable({
        handle: ".modal-content"
    });

    var year = new Date().getFullYear();
    for(i = year; i >=  1800; i--){
        $('select#anno').append('<option value="'+i+'">'+i+'</option>');
        $('select#annoMod').append('<option value="'+i+'">'+i+'</option>');
    }

    $('ul#bottoniAnnotator button').click(function(e){
        if($("ul.nav.nav-tabs li.active a").attr("id") == 'homeTab'){
            $('#alertMessage').text("Nessun documento selezionato.");
            $('#alertDoc').modal('show');
            e.stopPropagation();
        }
    });


    $('#selectTipoAnnot').change(function(){
        var annot = $(this).val();
        switch (annot) {
            case "autore":
                $('#salvaInsert').attr('disabled', 'disabled');
                $('#insertAutore').css('display', 'block');
                $('#insertAnnoPub').css('display', 'none');
                $('#insertTitolo').css('display', 'none');
                $('#insertURL').css('display', 'none');
                $('#insertComm').css('display', 'none');
                $('#insertDOI').css('display', 'none');
                $('#insertfunzRet').css('display', 'none');
//                $('#salvaInsert').removeAttr('disabled', 'disabled');
                break;
            case "anno":
                $('#salvaInsert').attr('disabled', 'disabled');
                $('#insertAutore').css('display', 'none');
                $('#insertAnnoPub').css('display', 'block');
                $('#insertTitolo').css('display', 'none');
                $('#insertURL').css('display', 'none');
                $('#insertDOI').css('display', 'none');
                $('#insertComm').css('display', 'none');
                $('#insertfunzRet').css('display', 'none');
//                $('#salvaInsert').removeAttr('disabled', 'disabled');
                break;
            case "titolo":
                $('#salvaInsert').attr('disabled', 'disabled');
                $('#insertAutore').css('display', 'none');
                $('#insertAnnoPub').css('display', 'none');
                $('#insertTitolo').css('display', 'block');
                $('#insertURL').css('display', 'none');
                $('#insertDOI').css('display', 'none');
                $('#insertComm').css('display', 'none');
                $('#insertfunzRet').css('display', 'none');
//                $('#salvaInsert').removeAttr('disabled', 'disabled');
                break;
            case "url":
                $('#salvaInsert').attr('disabled', 'disabled');
                $('#insertAutore').css('display', 'none');
                $('#insertAnnoPub').css('display', 'none');
                $('#insertTitolo').css('display', 'none');
                $('#insertURL').css('display', 'block');
                $('#insertDOI').css('display', 'none');
                $('#insertComm').css('display', 'none');
                $('#insertfunzRet').css('display', 'none');
//                $('#salvaInsert').removeAttr('disabled', 'disabled');
                break;
            case "doi":
                $('#salvaInsert').attr('disabled', 'disabled');
                $('#insertAutore').css('display', 'none');
                $('#insertAnnoPub').css('display', 'none');
                $('#insertTitolo').css('display', 'none');
                $('#insertURL').css('display', 'none');
                $('#insertComm').css('display', 'none');
                $('#insertfunzRet').css('display', 'none');
                $('#insertDOI').css('display', 'block');
//                $('#salvaInsert').removeAttr('disabled', 'disabled');
                break;
            case "commento":
                $('#salvaInsert').attr('disabled', 'disabled');
                $('#insertComm').css('display', 'block');
                $('#insertAnnoPub').css('display', 'none');
                $('#insertTitolo').css('display', 'none');
                $('#insertURL').css('display', 'none');
                $('#insertDOI').css('display', 'none');
                $('#insertAutore').css('display', 'none');
                $('#insertfunzRet').css('display', 'none');
//                $('#salvaInsert').removeAttr('disabled', 'disabled');
                break;
            case "funzione":
                $('#salvaInsert').attr('disabled', 'disabled');
                $('#insertComm').css('display', 'none');
                $('#insertAnnoPub').css('display', 'none');
                $('#insertTitolo').css('display', 'none');
                $('#insertURL').css('display', 'none');
                $('#insertDOI').css('display', 'none');
                $('#insertAutore').css('display', 'none');
                $('#insertfunzRet').css('display', 'block');
//                $('#salvaInsert').removeAttr('disabled', 'disabled');
                break;
            case "":
                $('#salvaInsert').attr('disabled', 'disabled');
                $('#insertAutore').css('display', 'none');
                $('#insertAnnoPub').css('display', 'none');
                $('#insertTitolo').css('display', 'none');
                $('#insertURL').css('display', 'none');
                $('#insertComm').css('display', 'none');
                $('#insertDOI').css('display', 'none');
                $('#insertfunzRet').css('display', 'none');
//                $('#salvaInsert').attr('disabled', 'disabled');
                break;
        }
   });

    $('#buttonCit').click(function(){
        var id = $("ul.nav.nav-tabs li.active a").attr("id");
        if(id != 'homeTab'){
            getCitazioni(id);
        }
    });

    /* Riempie modale di gestione delle annotazioni */
    $('#buttonGest').click(function(){
        var id = $("ul.nav.nav-tabs li.active a").attr("id");
        if(id != 'homeTab'){
            //mostra annotazioni sul nostro grafo
            annot_gest = annotDaGestire(id, 'http://vitali.web.cs.unibo.it/raschietto/graph/ltw1537');
            $('#modalGestAnnotazioni div#annotazioniPresenti table.tableAnnot tbody').html("");
            for(i = 0; i < annot_gest.length; i++){
                if(typeof(annot_gest[i].type) != "undefined"){
                    classCSS = getClassNameType(annot_gest[i].type.value);
                } else if (typeof(annot_gest[i].label) != "undefined"){
                    classCSS = getClassNameLabel(annot_gest[i].label.value);
                }
                col = '<span class="glyphicon glyphicon-tint label' + classCSS.substring(9, classCSS.length)+ '"></span>'; //<td>'+ parseDatetime(annot_gest[i].date.value)+'</td>
                tr = '<tr><td>'+col+' '+ classCSS.substring(9, classCSS.length)+'</td><td>Frammento</td><td>'+annot_gest[i].body_o.value+'</td><td><span class="glyphicon glyphicon-edit"></span><span class="glyphicon glyphicon-trash"></span></td></tr>';

                $('#modalGestAnnotazioni div#annotazioniPresenti table.tableAnnot tbody').append(tr);
            }

            //mostra annotazioni non ancora salvate nella variabile 'annotazioniSessione' per quel documento !!
            $('#modalGestAnnotazioni div#annotazioniInserite table.tableAnnot tbody').html("");
            var annotazioniSessione = JSON.parse(sessionStorage.annotazioniSessione);
            for(i = 0; i<annotazioniSessione.length; i++){
                if(annotazioniSessione[i].doc == id){
                    for(j = 0; j<annotazioniSessione[i].annotazioni.length; j++){
                        tipo = annotazioniSessione[i].annotazioni[j].tipo;
                        data = annotazioniSessione[i].annotazioni[j].data.replace("T", " ");
//                        target = annotazioniSessione[i].annotazioni[j].target;
                        selezione = annotazioniSessione[i].annotazioni[j].selezione;
                        oggetto = annotazioniSessione[i].annotazioni[j].oggetto;

                        idAnn = annotazioniSessione[i].annotazioni[j].id;
                        classCSS = getClassNameLabel(tipo);
                        col = '<span class="glyphicon glyphicon-tint label' + classCSS.substring(9, classCSS.length)+ '"></span>';
                        tr = '<tr data-id="'+idAnn+'"><td>'+col+' '+ classCSS.substring(9, classCSS.length)+'</td><td>'+data+'</td><td>'+oggetto+'</td><td><span class="glyphicon glyphicon-edit" onclick="modificaAnnotazioneLocale('+idAnn+')" data-toggle="tooltip" title="Modifica annotazione"></span><span onclick="eliminaAnnotazioneLocale('+idAnn+')" class="glyphicon glyphicon-trash" data-toggle="tooltip" title="Elimina annotazione"></span></td></tr>';

                        $('#modalGestAnnotazioni div#annotazioniInserite table.tableAnnot tbody').append(tr);
                    }
                }
            }
            sessionStorage.annotazioniSessione = JSON.stringify(annotazioniSessione);
        }

            //Visualizza citazioni inserite
            var citazioniSessione = JSON.parse(sessionStorage.citazioniSessione);
            for(i = 0; i<citazioniSessione.length; i++){
                if(citazioniSessione[i].doc == id){
                    for(j = 0; j<citazioniSessione[i].citazioni.length; j++){
                        tipo = citazioniSessione[i].citazioni[j].tipo;
                        data = citazioniSessione[i].citazioni[j].data.replace("T", " ");
//                        target = '';
                        citazione = citazioniSessione[i].citazioni[j].citazione;

                        idCit = citazioniSessione[i].citazioni[j].id;
                        classCSS = getClassNameLabel(tipo);
                        col = '<span class="glyphicon glyphicon-tint label' + classCSS.substring(9, classCSS.length)+ '"></span>';
                        tr = '<tr data-id="'+idCit+'"><td>'+col+' '+ classCSS.substring(9, classCSS.length)+'</td><td>'+data+'</td><td>'+citazione+'</td><td><span class="glyphicon glyphicon-edit" onclick="modificaCitazioneLocale('+idCit+')" data-toggle="tooltip" title="Modifica citazione"></span><span onclick="eliminaCitazioneLocale('+idCit+')" class="glyphicon glyphicon-trash" data-toggle="tooltip" title="Elimina citazione"></span><span class="glyphicon glyphicon-plus" data-toggle="tooltip" title="Annota citazione" onclick="annotaCitazione('+idCit+')"></span></td></tr>';

                        $('#modalGestAnnotazioni div#annotazioniInserite table.tableAnnot tbody').append(tr);
                    }
                }
            }
            sessionStorage.citazioniSessione = JSON.stringify(citazioniSessione);

    });


    /* Chiamata ajax per ottenere il documento selezionato */
    $(document).on("click", "#lista_doc a.list-group-item", function(){
        var urlDoc = $(this).attr('value');
        if(isOpen(urlDoc)){
            $("ul.nav.nav-tabs a[id='" + urlDoc + "']").tab("show");
        }else{
            var numTabs = $("ul.nav.nav-tabs").children().length;
            var mq = window.matchMedia("(min-width: 700px)");
            if(mq.matches){
                if(numTabs <= 4){
                    var title = $(this).text()
                    $(this).addClass("active").siblings().removeClass("active");
                    $.ajax({
                        url: '/scrapingSingoloDocumento',
                        type: 'GET',
                        data: {url: urlDoc},
                        success: function(result) {
                            addTab(result, urlDoc, title);
                            query = query_all_annotazioni(urlDoc);
                            get_annotazioni(query, urlDoc);
                            filtriAttivi();
                        },
                        error: function(error) {
                            $('#alertMessage').text("Errore nel caricamento del documento.");
                            $('#alertDoc').modal('show');
                        }
                    });
                }else{
                    $('#alertMessage').text("Puoi aprire 4 documenti contemporaneamente.");
                    $('#alertDoc').modal('show');
                }
            }else{
                if(numTabs <= 1){
                    var title = $(this).text()
                    $(this).addClass("active").siblings().removeClass("active");
                    $.ajax({
                        url: '/scrapingSingoloDocumento',
                        type: 'GET',
                        data: {url: urlDoc},
                        success: function(result) {
                            addTab(result, urlDoc, title);
                            query = query_all_annotazioni(urlDoc);
                            get_annotazioni(query, urlDoc);
                            filtriAttivi();
                        },
                        error: function(error) {
                            $('#alertMessage').text("Errore nel caricamento del documento.");
                            $('#alertDoc').modal('show');
                        }
                    });
                }else{
                    $('#alertMessage').text("Ingrandisci la pagina per aprire piu' documenti.");
                    $('#alertDoc').modal('show');
                }
            }
        }
    });
    
    function lanciaScraper() {
        alert("ciao");
        var urlDoc = "http://almatourism.unibo.it/article/view/5290?acceptCookies=1";
        $.ajax({
            url: '/scrapingAutomatico',
            type: 'GET',
            data: {url: urlDoc},
            success: function(result) {
                alert(result,urlDoc);
            },
            error: function(error) {
                alert("Error: " + error);
            }
        });

        return "";
    }

    $('#buttonScraper').click(function(){
        var href = $("ul.nav.nav-tabs li.active a").attr("id");
        lanciaScraper(href);
    });

    //quando viene premuto il bottone per caricare un nuovo url
    $("#nuovoDoc").click(function(){
        urlNuovoDoc = $("#uriNuovoDoc").val();
        $("#uriNuovoDoc").val("");
        if(urlNuovoDoc !== ""){
            if(isOpen(urlNuovoDoc)){
                $("ul.nav.nav-tabs a[id='" + urlNuovoDoc + "']").tab("show");
            }else{
                var numTabs = $("ul.nav.nav-tabs").children().length;
                if(numTabs <= 4){
                    $.ajax({
                        url: '/scrapingSingoloDocumento',
                        type: 'GET',
                        data: {url: urlNuovoDoc},
                        success: function(result) {
                            addTab(result, urlNuovoDoc, urlNuovoDoc);
                            query = query_all_annotazioni(urlNuovoDoc);
                            get_annotazioni(query, urlNuovoDoc);
                            filtriAttivi();
                        },
                        error: function(error) {
                            $('#alertMessage').text("L'URI inserito non � valido.");
                            $('#alertDoc').modal('show');
                        }
                    });
                }else{
                    $('#alertMessage').text("Puoi aprire 4 documenti contemporaneamente.");
                    $('#alertDoc').modal('show');
                }
            }
        } else {
            $('#alertMessage').text("L'URI inserito non � valido.");
            $('#alertDoc').modal('show');
        }
    });

});

/* Funzioni per la gestione delle tab in cui visualizzare i documenti */
function isOpen(url){
    var res = false;
    $("ul.nav.nav-tabs").children().each(function() {
        if(url == $(this).children().attr("id")){
            res = true;
            return res;
        }
    });
    return res;
}
function addTab(text, urlP, title){
    $('.active').removeClass('active');
    var url = urlP.replace(/([/|_.|_:|_-])/g, '');
    $("ul.nav.nav-tabs").append("<li class='active'><a data-toggle='tab' href='#"+url+"' id='"+urlP+"'><label>"+title+"</label><span class='glyphicon glyphicon-remove' title='Chiudi' onclick='closeTab(this)'></span></a></li>");
    $("div.tab-content").append("<div class='tab-pane fade active in' id='"+url+"'><div id='"+url+"t'></div></div>");
    $("#"+url+"t").html(text);
}
function closeTab(element){
    var tabContentId = $(element).parent().attr("href");
    $(element).parent().parent().remove(); //remove li of tab
    $(tabContentId).remove(); //remove respective tab content
    $('ul.nav.nav-tabs a:last').tab('show'); // Select first tab
}


function mostraAnnotGruppo(element){
    $(element).addClass("active").siblings().removeClass("active");
    urlGruppo = $(element).attr('value');
    urlD = $("ul.nav.nav-tabs li.active a").attr("id");
    filtriGruppo(urlGruppo, urlD);
}

function citazioniWidget(lista_cit){
        var cit = '';
        $('#modalAnnotCit div.modal-body').html('<form><div class="form-group" id="insertCit"><label for="selectCit">Scegli un riferimento bibliografico</label>'
                                   + '<select class="form-control" id="selectCit"><option value=""></option></select></div></form>');
        for(i = 0; i < lista_cit.length; i++){
            if(lista_cit[i].cit.length > 50){
            cit = lista_cit[i].cit.substring(0, 50)+'...';
            } else {
            cit = lista_cit[i].cit;
            }
            $('#selectCit').append('<option value="">'+cit+'</option>');
        }
   }
function getCitazioni(urlDoc){
        //var urlDoc = 'http://www.dlib.org/dlib/november14/brook/11brook.html';
        $.ajax({
            url: '/scrapingCitazioni',
            type: 'GET',
            data: {url: urlDoc},
            success: function(result) {
                lista_cit = JSON.parse(result);
                if(lista_cit.length > 0){
                    citazioniWidget(lista_cit)
                } else {
                    $('#alertMessage').text("Nessuna citazione presente nel documento selezionato.");
                    $('#alertDoc').modal('show');
                }
            },
            error: function(error) {
                $('#alertMessage').text(error);
                $('#alertDoc').modal('show');
            }
        });
    }

