describe("HTMLMediaElement", function() {
  var playerAmbient;
  var playerDestroy;
  var element;
  var domElem;
  var elementDestroy;
  var domElemDestroy;

  beforeEach(function() {
    $('body').prepend('<audio id="destroy">' +
      '<source src="../sound/tiro.ogg" type="audio/ogg" />' +
      '</audio><audio id="ambient">' +
      '<source src="../sound/WringThatNeck.ogg" type="audio/ogg" />' +
      '</audio>');
    playerAmbient = new MediaElementPlayer('#ambient', {
        success: function(mediaElement, domObject) {
            element = mediaElement;
            domElem = domObject;
        }
    });
    playerDestroy = new MediaElementPlayer('#destroy', {
        success: function(mediaElement, domObject) {
            elementDestroy = mediaElement;
            domElemDestroy = domObject;
        }
    });
    waitsFor(function() {
      return element !== null;
    }, "MediaElement should have loaded", 5000);
  });
  
  afterEach(function() {
    playerAmbient.remove();
    playerAmbient = null;
    playerDestroy.remove();
    playerDestroy = null;
    element = null;
    domElem = null;
    elementDestroy = null;
    domElemDestroy = null;
  });

  it("o plugin deve ser tipo pluginType native", function() {
    expect(element.pluginType).toEqual('native');
    expect(elementDestroy.pluginType).toEqual('native');
  });

  it("colocar como mudo ou não", function() {
    element.setMuted(true);
    elementDestroy.setMuted(true);
    expect(element.muted).toEqual(true);
    expect(elementDestroy.muted).toEqual(true);

    element.setMuted(false);
    elementDestroy.setMuted(false);
    expect(element.muted).toEqual(false);
    expect(elementDestroy.muted).toEqual(false);
  });

  it("mostrar o tempo corrente do audio", function() {
    expect(element.currentTime).toEqual(0);
    expect(elementDestroy.currentTime).toEqual(0);
  });

  it("definir o estado de play ou pausado", function() {
    element.play();
    expect(element.paused).toEqual(false);
    element.pause();
    expect(element.paused).toEqual(true);

    elementDestroy.play();
    expect(elementDestroy.paused).toEqual(false);
    elementDestroy.pause();
    expect(elementDestroy.paused).toEqual(true);
  });
});