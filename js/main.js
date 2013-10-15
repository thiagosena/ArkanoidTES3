var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

var context;
var world;
var scale = 30;

function init() {
  var gravity = new b2Vec2(0, 9.8);
  var allowSleep = true;
  world = new b2World(gravity, allowSleep);

  /*var createHoof();
  var createFloor();
  var createWallL();
  var createWallR();*/

  createBody();

  setupDebugDraw();

  window.setInterval(update, 1000 / 60);
}

function createBody(/*posX, posY, sizeX, doubleSizeY*/) {
  var bodyDef = new b2BodyDef;
  bodyDef.type = b2Body.b2_kinematicBody;
  bodyDef.position.x = 400;
  bodyDef.position.y = 599;

  var fixtureDef = new b2FixtureDef;
  fixtureDef.density = 1.0;
  fixtureDef.friction = .5;
  fixtureDef.restitution = .2;

  fixtureDef.shape = new b2PolygonShape;
  fixtureDef.shape.SetAsBox(400, .5);

  var body = world.CreateBody(bodyDef);
  var fixture = body.CreateFixture(fixtureDef);
}

function setupDebugDraw() {
  context = document.getElementById("canvas").getContext("2d");

  var debugDraw = new b2DebugDraw();

  debugDraw.SetSprite(context);
  /*debugDraw.SetDrawScale(scale);*/
  debugDraw.SetFillAlpha(.3);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

  world.SetDebugDraw(debugDraw);
}

function update() {
  world.Step(1 / 60, 10, 10);
  world.DrawDebugData();
  world.ClearForces();
}