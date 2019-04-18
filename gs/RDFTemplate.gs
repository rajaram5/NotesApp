/*
This function gets o3 rdf triple mustache triple from github
*/

function getO3Template() {
    var result = UrlFetchApp.fetch("https://raw.githubusercontent.com/rajaram5/NotesApp/master/o3-rdf-template");
    var contents = result.getContentText();
    return contents;
  }