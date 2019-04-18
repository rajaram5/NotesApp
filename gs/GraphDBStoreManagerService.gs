/*
This file contains functions to interact with graphDB triple store
*/

// Store properties
var GRAPHDB_URL = 'TRIPLE_STORE_BASE_URL'
var GRAPHDB_RESPOSITORY = 'REPOSITORY_NAME'
var GRAPHDB_USERNAME = 'USERNAME'
var GRAPHDB_PASSWORD = 'PASSWORD'

var RESOURCE_EXISTS_QUERY = "SELECT * WHERE { VALUES ?s {<RESOURCE_IRI>} ?s ?p ?o . }"

// Store turtle triples to the store
function postToStore(triples) {
    
    
    var headers = {
    'Authorization': "Basic " + Utilities.base64Encode(GRAPHDB_USERNAME + ":" + GRAPHDB_PASSWORD) 
    }; 
  
    var options = {
        'method': 'post',
        'contentType': 'text/turtle',
        'payload': triples,
        'headers':headers         
    };
    // This url is valid only for graphDB store  
    var stmtPostURL = GRAPHDB_URL + "/repositories/" + GRAPHDB_RESPOSITORY + "/statements";
    UrlFetchApp.fetch(stmtPostURL, options);
}

// Check existence of SUBJECT IRI in the store
function doesResourceExists(resourceIri) {    
    
    var headers = {
    'Authorization': "Basic " + Utilities.base64Encode(GRAPHDB_USERNAME + ":" + GRAPHDB_PASSWORD) 
    }; 
  
    var options = {
        'method': 'get',
        'Accept': 'text/csv',
        'headers':headers         
    };
  
    var query = RESOURCE_EXISTS_QUERY;  
        query = query.replace("RESOURCE_IRI", resourceIri);

    // This url is valid only for graphDB store 
    var queryURL = GRAPHDB_URL + "/repositories/" + GRAPHDB_RESPOSITORY + "?query=" + encodeURI(query);
    var result = UrlFetchApp.fetch(queryURL, options);
    var contents = result.getContentText();
    
    // Check if iri exist in the content
    if (contents.indexOf(resourceIri) !== -1) {
      return true;
    }
    else {
      return false;
    }
}