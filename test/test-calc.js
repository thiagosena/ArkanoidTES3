var assert = require('assert'),
    vows = require('vows'),
	 box2d = require('/home/travis/build/thiagosena/ArkanoidTES3/js/vendor/box2d'),
	 arkanoidTest = require('/home/travis/build/thiagosena/ArkanoidTES3/js/arkanoid');

var gravity = new box2d.b2Vec2(0, 0);
var world = new box2d.b2World(gravity, false);

vows.describe('audio').addBatch({
  'When performing playDestroySound': {
    topic: arkanoidTest.addBlock(world, 20, 350),
    'result should be valid': function (result) {
      assert.equal(result, true);
    }
  }
}).export(module);
