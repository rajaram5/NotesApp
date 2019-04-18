var O3_NOTE_BASE_IRI = "http://rdf.biosemantics.org/o3s/";
var DELETE_ROW_AFTER_PROCESSING = true

function getO3NotesTriples(sheet) {
  
    var triples = "";
    var data = sheet.getDataRange().getValues();
  
    var rdfTemplate = getO3Template();
    var timeStampCol = data[0].indexOf(TIME_STAMP_COL_NAME);
    var notesLinkCol = data[0].indexOf(NOTES_LINK_COL_NAME);
    var inviteeCol = data[0].indexOf(INVITEE_COL_NAME);

    for (i = 1; i < data.length; i++) {
       
        var timeStamp = (data[i][timeStampCol]).toString();

        var notesLink = (data[i][notesLinkCol]).toString();

        var invitee = (data[i][inviteeCol]).toString();

        var inviteeIRI = getPersonIri(invitee);
      
        if (timeStamp && inviteeIRI) {

            var o3IRI = getNotesIri(timeStamp)

            var rdfTemplateData = {
                o3iri: o3IRI,
                timpeStamp: timeStamp,
                notesLink: notesLink,
                invitee: inviteeIRI
            };

            var stmt = Mustache.render(rdfTemplate, rdfTemplateData);

            triples = triples.concat(stmt);
            triples = triples.concat("\n");
        }
    }
    return triples;
}

function deleteNotesRow(sheet) {
  
    var data = sheet.getDataRange().getValues();
    var timeStampCol = data[0].indexOf(TIME_STAMP_COL_NAME);
  
  if (DELETE_ROW_AFTER_PROCESSING) {

    for (i = 1; i < data.length; i++) {
       
        var timeStamp = (data[i][timeStampCol]).toString();
      
        if (timeStamp) {
            var o3IRI = getNotesIri(timeStamp)
            var doesNotesExistsInStore = doesResourceExists(o3IRI); 
            Logger.log("IRI <" + o3IRI + "> exists == " + doesNotesExistsInStore);
            
          if(doesNotesExistsInStore) { 
             //sheet.hideRows(i);
          }
            
        }
    }
  }
}


function getNotesIri(timeStamp) {
   return O3_NOTE_BASE_IRI + getSHA(timeStamp);
}

function getPersonIri(value) {

    var iri = "";

    if (value.toLowerCase() == "rr") {
        iri = "http://rdf.biosemantics.org/person/Rajaram";
    } else if (value.toLowerCase() == "an") {
        iri = "http://rdf.biosemantics.org/person/Annika";
    } else if (value.toLowerCase() == "el") {
        iri = "http://rdf.biosemantics.org/person/Eleni";
    }

    return iri;
}