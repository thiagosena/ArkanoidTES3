describe("HTMLMediaElement", function() {
  var player;
  var element;
  var domElem;
  var NETWORK_EMPTY = 0, NETWORK_IDLE = 1, NETWORK_LOADING = 2, NETWORK_NO_SOURCE = 3;
  var HAVE_NOTHING = 0, HAVE_METADATA = 1, HAVE_CURRENT_DATA = 2, HAVE_FUTURE_DATA = 3, HAVE_ENOUGH_DATA = 4;
  var METADATA_TIMEOUT = 500, ENOUGH_DATA_TIMEOUT = 1000;

  beforeEach(function() {
    $('body').prepend('<audio id="ambient">' +
      '<source src="../sound/tiro.ogg" type="audio/ogg" />' +
      '</audio>');
    player = new MediaElementPlayer('#ambient', {
        success: function(mediaElement, domObject) {
            element = mediaElement;
            domElem = domObject;
        }
    });
    waitsFor(function() {
      return element !== null;
    }, "MediaElement should have loaded", 5000);
  });
  
  afterEach(function() {
    player.remove();
    player = null;
    element = null;
    domElem = null;
  });

  it("o plugin deve ser tipo pluginType native", function() {
    expect(element.pluginType).toEqual('native');
  });

  it("colocar como mudo ou não", function() {
    element.setMuted(true);
    expect(element.muted).toEqual(true);
    element.setMuted(false);
    expect(element.muted).toEqual(false);
  });

  it("mostrar o tempo corrente do audio", function() {
    expect(element.currentTime).toEqual(0);
  });

  it("definir o estado de play ou pausado", function() {
    element.play();
    expect(element.paused).toEqual(false);
    element.pause();
    expect(element.paused).toEqual(true);
  });
});