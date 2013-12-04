describe('The game arkanoid', function(){

	describe('Quando inicializar', function(){
		var world;
		var contexto;

		beforeEach(function() {
			$('body').prepend('<canvas id="canvas" width="600" height="400" style="background-color:#000000;"></canvas> <audio id="ambient"><source src="sound/WringThatNeck.ogg" type="audio/ogg" />Your browser does not support HTML5 audio. Please upgrade your browser.</audio><audio id="destroy"><source src="sound/tiro.ogg" type="audio/ogg" />Your browser does not support HTML5 audio. Please upgrade your browser.</audio>');

			var gravity = new b2Vec2(0, 0);
			var doSleep = false;
			var canvaselement = document.getElementById("canvas");
			contexto = canvaselement.getContext("2d");
			world = new b2World(gravity, doSleep);
		});

		it('tamanho padrão 600x400 da tela do jogo', function(){
			var ark = new ArkanoidClass();
			expect(ark.width()).toEqual(600);
			expect(ark.height()).toEqual(400);
		});

		it('testando funcao addBlock', function(){
			var ark = new ArkanoidClass();
			expect(ark.addBlock(world,10,10)).toEqual(true);
		});

		it('testando funcao addCircle', function(){
			var ark = new ArkanoidClass();
			expect(ark.addCircle(world,ark.width,ark.height)).toEqual(true);
		});

		it('testando funcao processObjects', function(){
			var ark = new ArkanoidClass();
			expect(ark.processObjects(world,contexto,ark.width,ark.height)).toEqual(false);
		});


	});

	describe('configuração do teclado', function(){
		beforeEach(function() {
			$('html').prepend('<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body onload="ArkanoidClass();" style="background:rgb(240,255,225)" id="target"><canvas id="canvas" width="600" height="400" style="background-color:#000000;"></canvas> <audio id="ambient"><source src="sound/WringThatNeck.ogg" type="audio/ogg" />Your browser does not support HTML5 audio. Please upgrade your browser.</audio><audio id="destroy"><source src="sound/tiro.ogg" type="audio/ogg" />Your browser does not support HTML5 audio. Please upgrade your browser.</audio>');
		});

		it("Apertando o A", function(){
			var ark = new ArkanoidClass();		
			var e = $.Event("keypress");
			// set the key that was pressed to the enter key
			e.which = 97;

			// trigger the event on the game element
			$('#target').trigger(e)
			expect(ark.pressKey()).toEqual(undefined);
		});
	})
	
});

