var GRAPHDB_URL = 'TRIPLE_STORE_BASE_URL'
var GRAPHDB_RESPOSITORY = 'REPOSITORY_NAME'
var GRAPHDB_USERNAME = 'USERNAME'
var GRAPHDB_PASSWORD = 'PASSWORD'

var RESOURCE_EXISTS_QUERY = "SELECT * WHERE { VALUES ?s {<RESOURCE_IRI>} ?s ?p ?o . }"

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
  
    var stmtPostURL = GRAPHDB_URL + "/repositories/" + GRAPHDB_RESPOSITORY + "/statements";
    UrlFetchApp.fetch(stmtPostURL, options);
}


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
  
    var queryURL = GRAPHDB_URL + "/repositories/" + GRAPHDB_RESPOSITORY + "?query=" + encodeURI(query);
    var result = UrlFetchApp.fetch(queryURL, options);
    var contents = result.getContentText();
    //Logger.log(contents)
    
    if (contents.indexOf(resourceIri) !== -1) {
      return true;
    }
    else {
      return false;
    }
}