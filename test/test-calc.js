var assert = require('assert'),
    vows = require('vows'),
	 arkanoidTest = require('/home/travis/build/thiagosena/ArkanoidTES3/js/arkanoid');
   

vows.describe('audio').addBatch({
  'When performing play': {
    topic: arkanoidTest.addCircle(),
    'result should be valid': function (result) {
      !assert.isNumber(result);
      assert.equal(result, true);
    }
  }
}).export(module);

vows.describe('audio').addBatch({
	'performing play Destroy': {
		topic: arkanoidTest.addBlock(),
	    'result should be valid': function (result) {
	      !assert.isNumber(result);
	      assert.equal(result, true);
	    }
	}
}).export(module);
