/*
Function to get SHA1 hash string of a text
*/
function getSHA(str){
    return Utilities
      .computeDigest(Utilities.DigestAlgorithm.SHA_1, str) // string to digested array of integers
      .map(function(val) {return val<0? val+256 : val}) // correct the offset
      .map(function(val) {return ("00" + val.toString(16)).slice(-2)}) // add padding and enconde
      .join(''); // join in a single string
}