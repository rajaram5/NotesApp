function onOpen(e) {
    SpreadsheetApp.getUi().createAddonMenu()
        .addItem('Config', 'showSidebar')
        .addItem('Test script', 'sheetToN3')
        .addToUi();
}

function onInstall(e) {
    onOpen(e);
}

function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Convert to rdf');
  SpreadsheetApp.getUi().showSidebar(ui);
}

function sheetToN3() {
    // Get data sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_SHEET_NAME);
    if (sheet != null) {
        var triples = getO3NotesTriples(sheet);
        if (triples) {
            Logger.log(triples);
            postToStore(triples);
            deleteNotesRow(sheet);
        } else {
            Logger.log("No triples can be generated for o3 notes from sheet " + DATA_SHEET_NAME);
        }
    } else {
        Logger.log("Sheet " + DATA_SHEET_NAME + " doesn't exits");
    }

}