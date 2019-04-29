/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  var unitTable = [["gal", "L"], ["lbs", "Kg"], ["mi", "Km"], ["L", "gal"], ["Kg", "lbs"], ["Km", "mi"]];
  var unitSpell = [["gal", "gallons"], ["lbs", "pounds"], ["mi", "miles"], ["L", "litters"], ["Kg", "kilograms"], ["Km", "kilometers"]];
  
  this.getNum = function(input) {
    var result;
    
    result = input.replace(/[a-zA-Z]+/, ''); 
    if(result == '') {                      //This is the case when no number is given, just convert the number to "1".
      result = "1";
    }
    return result;
  };
  
  
  
  this.getUnit = function(input) {
    var result;
    result = input.replace(/[0-9\/\.]+/, '');    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result = "";
    for (let i=0; i < 6; i++) {
      if (initUnit.toUpperCase() == unitTable[i][0].toUpperCase()) {
        result = unitTable[i][1];
      }
    } 
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result = "";
    for (let i=0; i < 6; i++) {
      if (unit.toUpperCase() == unitSpell[i][0].toUpperCase()) {
        result = unitSpell[i][1];
      }
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result = this.initNumberConverter(initNum);  // Using the attached function initNumberConverter to fixed value for conversion
    switch (initUnit.toUpperCase()) {
      case "GAL": 
        result = result * galToL;
        break;
      case "LBS":
        result = result * lbsToKg;
        break;
      case "MI":
        result = result * miToKm;
        break;
      case "L":
        result = result / galToL;
        break;
      case "KG":
        result = result / lbsToKg;
        break;
      case "KM":
        result = result / miToKm;
        break;
      default:
        result = "";
    }
    if (result) {
      result = Math.round(result * 100000) / 100000;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    if (returnUnit == "") {
      result = "A correct unit is not given.  Valid units are: gal, L, lbs, Kg, mi, Km";  // Error message for an incorect input unit.
    } else if(returnUnit && returnNum == "") {
      result = "A correct number is not given.  Please give a correct number.";   // error message for an incorrect input number.
    } else{
    result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    }
    return result;
  };
  
  // The folowing is the function to convert the input "number" to the number to convert.
  this.initNumberConverter = (Number) => {  
    var result = Number;
    const regex = /(^\d+)?\.?(\d+)?\/?(\d+)?$/;
    let ChkArray = result.match(regex);
    console.log(Number);
    if (ChkArray[1] && !ChkArray[3]) {
      result = parseFloat(result);                             // This is the case for a fixed or interger number  1.556 or 3
    } else if (ChkArray[1] && !ChkArray[2] && ChkArray[3]) {
      result = parseFloat(ChkArray[1]) / parseFloat(ChkArray[3]);  // This is the case for just a fraction  3/5
    } else if (ChkArray[1] && ChkArray[2] && ChkArray[3]) {
      result = parseFloat(ChkArray[1]) + parseFloat(ChkArray[2]) / parseFloat(ChkArray[3]);  // This is a case for integer plus fractikon 3.4/5                                              // This is a case for unrecognizable numbers or chracters are given
    }
    else {
      result = null;
    }
    return result;
  }
}


module.exports = ConvertHandler;
