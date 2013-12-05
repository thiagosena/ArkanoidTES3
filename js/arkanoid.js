function ArkanoidClass() {
  
var mainclass = this; //Referência a propria classe.
  
this.addCircle=function(world,canvaswidth,canvasheight) {
  // create basic circle
  var bodyDef = new b2BodyDef();
  var fixDef = new b2FixtureDef();
  fixDef.density = 1;
  fixDef.friction = 0;
  fixDef.restitution = 1;

  bodyDef.type = b2Body.b2_dynamicBody;
  scale = 6;
  fixDef.shape = new b2CircleShape(scale);

  bodyDef.position.Set(canvaswidth/2,canvasheight/2);


  var body = world.CreateBody(bodyDef).CreateFixture(fixDef);
  body.GetBody().ApplyImpulse(new b2Vec2(60, -777777),body.GetBody().GetWorldCenter());
  if(body){
    return true;
  }
  else{
    return false;
  }
  
};

this.addBlock=function(world,x,y) {

  // create basic block
  var bodyDef = new b2BodyDef();
  var fixDef = new b2FixtureDef();
  fixDef.density = 1;
  fixDef.friction = 0;
  fixDef.restitution = 1;

  bodyDef.type = b2Body.b2_kinematicBody;
  scale = 13;

  fixDef.shape = new b2PolygonShape();
  fixDef.shape.SetAsBox(30,15);
  bodyDef.position.Set(x,y);
  var body = world.CreateBody(bodyDef).CreateFixture(fixDef);
  if(body){
    return true;
  }
  else{
    return false;
  }
  
};

this.addPaddle=function(world, canvaswidth){
  //create the paddle
  //Define the paddle
  var globalBodyPaddle;
  var bodyDefPaddle = new b2BodyDef();
  bodyDefPaddle.type = b2Body.b2_dynamicBody;
  bodyDefPaddle.position.Set(canvaswidth/2, 20);
  var fixDefPaddle = new b2FixtureDef();
  fixDefPaddle.density = 1;
  fixDefPaddle.friction = 0;
  fixDefPaddle.restitution = 1;

  fixDefPaddle.shape = new b2PolygonShape();
  fixDefPaddle.shape.SetAsBox(95,10);

  globalBodyPaddle = world.CreateBody(bodyDefPaddle).CreateFixture(fixDefPaddle);
  //Configurando o teclado
  $( "body" ).keypress(function( event ) {
    if (event.which == 97 ) {
    //window.alert("voce apertou A");
      globalBodyPaddle.GetBody().SetLinearVelocity(new b2Vec2(-9999999, 0));
    }

    if (event.which == 115 ) {
    //window.alert("voce apertou S");
      globalBodyPaddle.GetBody().SetLinearVelocity(new b2Vec2(0, -9999999));
    }

    if (event.which == 100 ) {
    //window.alert("voce apertou D");
      globalBodyPaddle.GetBody().SetLinearVelocity(new b2Vec2(9999999, 0));
    }

    if (event.which == 119 ) {
    //window.alert("voce apertou W");
      globalBodyPaddle.GetBody().SetLinearVelocity(new b2Vec2(0, 9999999));
    }
  });
};

//Chamada inumeras vezes por segundo
//Redesenha os objetos modificados na tela
this.processObjects=function(world, context, canvaswidth, canvasheight) {
  
  world.Step(1 / 60, 100, 100);
  context.clearRect(0,0,canvaswidth,canvasheight);
  world.ClearForces();
  
  var node = world.GetBodyList();
  
  while (node) {
    
    var b = node;
    
    node = node.GetNext();

    var position = b.GetPosition();

    //desenhando os objetos que se movem
    if (b.GetType() == b2Body.b2_dynamicBody) {
      
      var fl = b.GetFixtureList();
      if (fl === null) {
        continue;
      }
      var shape = fl.GetShape();
      var shapeType = shape.GetType();
      
      // desenhando a bola com uma cor sólida, não é necessário se preocupar com a rotação
      if (shapeType == b2Shape.e_circleShape) {
        context.strokeStyle = "#FFFFFF";
        context.fillStyle = "#FFFFFF";
        context.beginPath();
        context.arc(position.x,canvasheight - position.y,shape.GetRadius(),0,Math.PI*2,true);
        context.closePath();
        context.stroke();
        context.fill();
        if(position.y < 0){

        }
      }
      else if(shapeType == b2Shape.e_polygonShape){
        context.strokeStyle = "#FFFFFF";
        context.fillStyle = "#000000";
        context.beginPath();
        context.rect(position.x, canvasheight - position.y, 95, 10);
        context.closePath();
        context.stroke();
        context.fill();
      }
    }
   
   
    else if(b.GetType() == b2Body.b2_kinematicBody){//desenhando os blocos
      
      var fl2 = b.GetFixtureList();
      if (fl2 === null) {
       continue;
      }
      var shape2 = fl2.GetShape();
      var shapeType2 = shape2.GetType();

      // draw the blocks
      if (shapeType2 == b2Shape.e_polygonShape) {
        context.strokeStyle = "#a4a4a4";
        context.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        context.beginPath();
        context.rect(position.x, canvasheight - position.y, 30, 15);
        context.closePath();
        context.stroke();
        context.fill();
      }
    }
    
    var edge = b.GetContactList();
    var destroy = new Song();
    while (edge)  {
      var other = edge.other;
      
      if (other.GetType() == b2Body.b2_kinematicBody) {
        var othershape = other.GetFixtureList().GetShape();

        if (othershape.GetType() == b2Shape.e_polygonShape) {
          destroy.playDestroySound();
          world.DestroyBody(other);
          break;	
        }
      }
      edge = edge.next;
    }
  }

  //termine a fase
  if (node) {
    return true;
  }
  else{
    return false;
  }
};




//===============================construtor===============================
  
  var music = new Song();
  music.startBackgroundMusic();

  // Define the canvas
  var canvaselem = document.getElementById("canvas");
  var context = canvaselem.getContext("2d");
  var canvaswidth = canvaselem.width-0;
  var canvasheight = canvaselem.height-0;

  /**
   * Pegar o largura do canvas.
   */
  this.width = function() {
      return canvaswidth;
  };

  /**
   * Pegar a altura do canvas
   */
  this.height = function() {
      return canvasheight;
  };

  // Define the world
  var gravity = new b2Vec2(0, 0);
  var doSleep = false;
  var world = new b2World(gravity, doSleep);
  var deletionBuffer = 4;

  //create ground and roof
  var fixDef = new b2FixtureDef();
  fixDef.density = 1;
  fixDef.friction = 0;
  fixDef.restitution = 0;

  var bodyDef = new b2BodyDef();
  bodyDef.type = b2Body.b2_staticBody;

  fixDef.shape = new b2PolygonShape();
  fixDef.shape.SetAsBox(canvaswidth/2,2);

  bodyDef.position.Set(canvaswidth/2, -30);
  world.CreateBody(bodyDef).CreateFixture(fixDef);

  bodyDef.position.Set(canvaswidth/2, canvasheight);
  world.CreateBody(bodyDef).CreateFixture(fixDef);

  //create walls
  var fixDef2 = new b2FixtureDef();
  fixDef2.density = 1;
  fixDef2.friction = 0;
  fixDef2.restitution = 0;

  var bodyDef2 = new b2BodyDef();
  bodyDef2.type = b2Body.b2_staticBody;

  fixDef2.shape = new b2PolygonShape();
  fixDef2.shape.SetAsBox(2,canvasheight);

  bodyDef2.position.Set(0, canvasheight/2);
  world.CreateBody(bodyDef2).CreateFixture(fixDef2);

  bodyDef2.position.Set(canvaswidth, canvasheight/2);
  world.CreateBody(bodyDef2).CreateFixture(fixDef2);


  //create the paddle
  mainclass.addPaddle(world,canvaswidth);

  // Putting the ball
  mainclass.addCircle(world,canvaswidth,canvasheight);

  //Putting the blocks
  for (var i=0; i<4;i++){	
    for(var j=0; j<15;j++ ){
      mainclass.addBlock(world,20+(36*j),350 - 36*i);
    }
  }

  // Setando o tempo de refresh, e a função de callBack
  window.setInterval(function(){mainclass.processObjects(world, context,canvaswidth,canvasheight);}, (1000 / 500));

//======================Fim do construtor=================================================
  

}//Fim de ArkanoidClass
