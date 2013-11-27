var assert = require('assert'),
    vows = require('vows'),
    audioTest = require('/home/travis/build/thiagosena/ArkanoidTES3/js/audio');
	 arkanoidTest = require('/home/travis/build/thiagosena/ArkanoidTES3/js/arkanoid');
   

vows.describe('audio').addBatch({
  'When performing play': {
    topic: audioTest.play(),
    'result should be valid': function (result) {
      assert.isNumber(result);
      assert.equal(result, true);
    }
  }
}).export(module);

vows.describe('audio').addBatch({
	'performing play Destroy': {
		topic: audioTest.playDestroySound(),
	    'result should be valid': function (result) {
	      assert.isNumber(result);
	      assert.equal(result, true);
	    }
	}
}).export(module);
