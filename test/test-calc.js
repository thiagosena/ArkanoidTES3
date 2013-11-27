var assert = require('assert'),
    vows = require('vows'),
    seriousCalculations = require('/home/travis/build/thiagosena/ArkanoidTES3/js/calc');

vows.describe('calc').addBatch({
  'When performing serious calculations': {
    topic: seriousCalculations.performSeriousCalculations(4),
    'result should be valid': function (result) {
      assert.isNumber(result);
      assert.equal(result, 8);
    }
  }
}).export(module);

vows.describe('calc').addBatch({
	'When performing function add calculations': {
		topic: seriousCalculations.addIntoCalculations(2, 2),
	    'result should be valid': function (result) {
	      assert.isNumber(result);
	      assert.equal(result, 4);
	    }
	}
}).export(module);
