/*
 This file contains functions which can be useb by triggers (OnInstall)
*/

// To create menu items in the googlesheet
function onOpen(e) {
    SpreadsheetApp.getUi().createAddonMenu()
        .addItem('Create rdf', 'sheetToN3')
        .addToUi();
}

function onInstall(e) {
    onOpen(e);
}

/*
 This function calls functions in other files 
 1) to create triples based on googlesheet rows
 2) to store triples to the graphDB triplestore 
*/
function sheetToN3() {
    // Get data sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATA_SHEET_NAME);
    if (sheet != null) {
        // Get triples
        var triples = getO3NotesTriples(sheet);
        if (triples) {
            // Store triples
            postToStore(triples);
        } else {
            Logger.log("No triples can be generated for o3 notes from sheet " + DATA_SHEET_NAME);
        }
    } else {
        Logger.log("Sheet " + DATA_SHEET_NAME + " doesn't exits");
    }

}