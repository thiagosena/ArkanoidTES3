// Declare all the commonly used objects as variables for convenience
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

var context = document.getElementById("canvas").getContext("2d");
var world;
var scale = 15; //15 pixels on our canvas correspond to 1 meter in the box2d world
var ball;
var paddle;

function init() {
  // Setup the box2d World that will do most of the physics calculation
  var gravity = new b2Vec2(0, 0);
  var allowSleep = false; //Allow objects that are at rest to fall asleep and be excluded from calculations
  world = new b2World(gravity, allowSleep);

  // Create world boundaries
  createWorldBoundaries();

  // Create a body with special user data
  createBall();

  // Create moving paddle
  createPaddle();

  // Create contact listeners and track events
//	listenForContact();

  window.addEventListener("keydown", handleKeyDown, true);
  window.addEventListener("keyup", handleKeyUp, true);

  setupDebugDraw();
  animate();
}

function createWorldBoundaries() {
  // Create Roof
  // A body definition holds all the data needed to construct a rigid body.
  var bodyDef = new b2BodyDef;
  bodyDef.type = b2Body.b2_staticBody;
  bodyDef.position.x = 800 / 2 / scale;
  bodyDef.position.y = 9 / scale;

  // A fixture is used to attach a shape to a body for collision detection.
  // A fixture definition is used to create a fixture
  var fixtureDef = new b2FixtureDef;
  fixtureDef.density = 1;
  fixtureDef.friction = 0;
  fixtureDef.restitution = 1;
  fixtureDef.shape = new b2PolygonShape;
  fixtureDef.shape.SetAsBox(400 / scale, 10 / scale); //800 pixels wide and 20 pixels tall
  var body = world.CreateBody(bodyDef);
  var fixture = body.CreateFixture(fixtureDef);

  // Create Floor
  bodyDef.position.x = 800 / 2 / scale;
  bodyDef.position.y = 599 / scale;
  fixtureDef.shape.SetAsBox(400 / scale, .5 / scale);
  body = world.CreateBody(bodyDef);
  fixture = body.CreateFixture(fixtureDef);

  // Create Left Wall
  bodyDef.position.x = 10 / scale;
  bodyDef.position.y = 618 / 2 / scale;
  fixtureDef.shape.SetAsBox(10 / scale, 290 / scale);
  body = world.CreateBody(bodyDef);
  fixture = body.CreateFixture(fixtureDef);

  // Create Right Wall
  bodyDef.position.x = 789 / scale;
  bodyDef.position.y = 618 / 2 / scale;
  body = world.CreateBody(bodyDef);
  fixture = body.CreateFixture(fixtureDef);
}

function createBall() {
  var bodyDef = new b2BodyDef;
  bodyDef.type = b2Body.b2_dynamicBody;
  bodyDef.position.x = 399 / scale;
  bodyDef.position.y = 480 / scale;
  var fixtureDef = new b2FixtureDef;
  fixtureDef.density = 1;
  fixtureDef.friction = 0;
  fixtureDef.restitution = 1;
  fixtureDef.shape = new b2CircleShape(5 / scale);
  ball = world.CreateBody(bodyDef);
  var fixture = ball.CreateFixture(fixtureDef);

  ball.ApplyImpulse(new b2Vec2(2, 0),
      ball.GetWorldCenter());
}

function createPaddle() {
  var bodyDef = new b2BodyDef;
  bodyDef.type = b2Body.b2_dynamicBody;
  bodyDef.position.x = 399 / scale;
  bodyDef.position.y = 530 / scale;
  var fixtureDef = new b2FixtureDef;
  fixtureDef.density = 1;
  fixtureDef.friction = 0;
  fixtureDef.restitution = 1;
  fixtureDef.shape = new b2PolygonShape;
  fixtureDef.shape.SetAsBox(40 / scale, 7 / scale);
  paddle = world.CreateBody(bodyDef);
  var fixture = paddle.CreateFixture(fixtureDef);

}

function handleKeyDown(e) {
  if (e.keyCode === 65 || e.keyCode === 37) {
    if (paddle.GetPosition().x > 10){
      paddle.SetLinearVelocity(new b2Vec2(-10, 0));
    }
  }

  if (e.keyCode === 68 || e.keyCode === 39) {
    paddle.SetLinearVelocity(new b2Vec2(10, 0));
  }
}

function handleKeyUp(e) {
  paddle.SetLinearVelocity(new b2Vec2(0, 0));
}

function setupDebugDraw() {
  var debugDraw = new b2DebugDraw();

  // Use this canvas context for drawing the debugging screen
  debugDraw.SetSprite(context);
  // Set the scale 
  debugDraw.SetDrawScale(scale);
  // Fill boxes with an alpha transparency of 0.3
  debugDraw.SetFillAlpha(0.3);
  // Draw lines with a thickness of 1
  debugDraw.SetLineThickness(1.0);
  // Display all shapes and joints
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

  // Start using debug draw in our world
  world.SetDebugDraw(debugDraw);
}

var timeStep = 1 / 60;

//As per the Box2d manual, the suggested iteration count for Box2D is 8 for velocity and 3 for position. 
var velocityIterations = 3;
var positionIterations = 3;

function animate() {
  world.Step(timeStep, velocityIterations, positionIterations);
  world.ClearForces();

  world.DrawDebugData();

  //Kill Special Body if Dead
  if (specialBody && specialBody.GetUserData().life <= 0) {
    world.DestroyBody(specialBody);
    specialBody = undefined;
    alert("The special body was destroyed");
  }

  setTimeout(animate, timeStep);
}

var specialBody;
function createSpecialBody() {
  var bodyDef = new b2BodyDef;
  bodyDef.type = b2Body.b2_dynamicBody;
  bodyDef.position.x = 450 / scale;
  bodyDef.position.y = 0 / scale;

  specialBody = world.CreateBody(bodyDef);
  specialBody.SetUserData({name: "special", life: 250})

  //Create a fixture to attach a circular shape to the body
  var fixtureDef = new b2FixtureDef;
  fixtureDef.density = 1.0;
  fixtureDef.friction = 0.5;
  fixtureDef.restitution = 0.5;

  fixtureDef.shape = new b2CircleShape(30 / scale);

  var fixture = specialBody.CreateFixture(fixtureDef);
}


//function listenForContact() {
//  var listener = new Box2D.Dynamics.b2ContactListener;
//  listener.PostSolve = function(contact, impulse) {
//    var body1 = contact.GetFixtureA().GetBody();
//    var body2 = contact.GetFixtureB().GetBody();
//
//
//  };
//  world.SetContactListener(listener);
//}
//
//document.addEventListener("mousedown", function(e) {
//  isMouseDown = true;
//  handleMouseMove(e);
//  document.addEventListener("mousemove", handleMouseMove, true);
//}, true);
//
//document.addEventListener("mouseup", function() {
//  document.removeEventListener("mousemove", handleMouseMove, true);
//  isMouseDown = false;
//  mouseX = undefined;
//  mouseY = undefined;
//}, true);
//
//function handleMouseMove(e) {
//  mouseX = (e.clientX - canvasPosition.x) / 30;
//  mouseY = (e.clientY - canvasPosition.y) / 30;
//}
//;
//
//function getBodyAtMouse() {
//  mousePVec = new b2Vec2(mouseX, mouseY);
//  var aabb = new b2AABB();
//  aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
//  aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
//
//  // Query the world for overlapping shapes.
//
//  selectedBody = null;
//  world.QueryAABB(getBodyCB, aabb);
//  return selectedBody;
//}
//
//function getBodyCB(fixture) {
//  if (fixture.GetBody().GetType() != b2Body.b2_staticBody) {
//    if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
//      selectedBody = fixture.GetBody();
//      return false;
//    }
//  }
//  return true;
//}
//
////update
////http://js-tut.aardon.de/js-tut/tutorial/position.html
//function getElementPosition(element) {
//  var elem = element, tagname = "", x = 0, y = 0;
//
//  while ((typeof (elem) == "object") && (typeof (elem.tagName) != "undefined")) {
//    y += elem.offsetTop;
//    x += elem.offsetLeft;
//    tagname = elem.tagName.toUpperCase();
//
//    if (tagname == "BODY")
//      elem = 0;
//
//    if (typeof (elem) == "object") {
//      if (typeof (elem.offsetParent) == "object")
//        elem = elem.offsetParent;
//    }
//  }
//
//  return {x: x, y: y};
//}