/*
Google sheet contants which are used in service layer function 
*/

var DATA_SHEET_NAME = "Form Responses 1";
var TIME_STAMP_COL_NAME = "Timestamp";
var NOTES_LINK_COL_NAME = "Link to the notes";
var INVITEE_COL_NAME = "Invite";


// Map invited person string to IRI
var PERSON_IRI = {};

PERSON_IRI["rr"] = "http://rdf.biosemantics.org/person/Rajaram";
PERSON_IRI["an"] = "http://rdf.biosemantics.org/person/Annika";
PERSON_IRI["el"] = "http://rdf.biosemantics.org/person/Eleni";
