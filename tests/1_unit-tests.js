/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '2.589km';
      assert.equal(convertHandler.getNum(input), 2.589);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '1/4km';
      assert.equal(convertHandler.getNum(input), 0.25);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '3.5/6lbs';
      assert.equal(convertHandler.getNum(input), 3+(5/6));
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = "1/35/6kg";
      assert.equal(convertHandler.getNum(input), null);
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = "km";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.isOk(convertHandler.getReturnUnit(ele), "Found a conversion unit");
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = "ton";
      assert.isNotOk(convertHandler.getReturnUnit(input), "The program went to an error transaction with UnKnown Unit Input");
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['L','gal','Km','mi','Kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons', 'litters', 'miles', 'kilometers', 'pounds', 'kilograms']
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [10.5, 'L'];
      var expected = 2.77381;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [10, 'Mi'];
      var expected = 16.0934;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [5, 'Km'];
      var expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [10, 'Lbs'];
      var expected = 4.53592;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [4.53592, 'Kg'];
      var expected = 10;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
  });

});
