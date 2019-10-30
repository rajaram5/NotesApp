// Base url of the note instance
var O3_NOTE_BASE_IRI = "http://rdf.biosemantics.org/o3s/";
var DELETE_ROW_AFTER_PROCESSING = true

/*
This function creates o3 notes instances based on
rows of google sheet. The hash string of timestamp is used
as a suffix of o3 instance
*/
function getO3NotesTriples(sheet) {
  
    var triples = "";
    var data = sheet.getDataRange().getValues();

    // Get o3 rdf triple template
    var rdfTemplate = getO3Template();

    // Get column indexes
    var timeStampCol = data[0].indexOf(TIME_STAMP_COL_NAME);
    var notesLinkCol = data[0].indexOf(NOTES_LINK_COL_NAME);
    var inviteeCol = data[0].indexOf(INVITEE_COL_NAME);

    for (i = 1; i < data.length; i++) {
       
        // Get cell values
        var timeStamp = (data[i][timeStampCol]).toString();
        var notesLink = (data[i][notesLinkCol]).toString();
        var invitee = (data[i][inviteeCol]).toString();
        
        // Get person IRI 
        var inviteeIRI = PERSON_IRI[invitee.toLowerCase()];
      
        if (timeStamp && inviteeIRI) {

            // Get o3 IRI
            var o3IRI = getNotesIri(timeStamp)

            // Create key value pairs to fill in rdf template
            var rdfTemplateData = {
                o3iri: o3IRI,
                timpeStamp: timeStamp,
                notesLink: notesLink,
                invitee: inviteeIRI
            };

            // Fill in rdf template based on key value pair
            var stmt = Mustache.render(rdfTemplate, rdfTemplateData);

            // Contact triples
            triples = triples.concat(stmt);
            triples = triples.concat("\n");
        }
    }
    return triples;
}

// Create o3 instance iri based on timestamp
function getNotesIri(timeStamp) {
   return O3_NOTE_BASE_IRI + getSHA(timeStamp);
}
