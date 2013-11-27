var assert = require('assert'),
    vows = require('vows'),
	 arkanoidTest = require('/home/travis/build/thiagosena/ArkanoidTES3/js/arkanoid');
   

vows.describe('audio').addBatch({
  'When performing playDestroySound': {
    topic: arkanoidTest.init(),
    'result should be valid': function (result) {
      assert.equal(result, true);
    }
  }
}).export(module);
