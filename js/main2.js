	function init() {
		// Define the canvas
		var canvaselem = document.getElementById("canvas");
		var context = canvaselem.getContext("2d");
		var canvaswidth = canvaselem.width-0;
		var canvasheight = canvaselem.height-0;

		// Define the world
		var gravity = new b2Vec2(0, 0);
		var doSleep = false;
		var world = new b2World(gravity, doSleep);
		var deletionBuffer = 4;
         
		//create ground and roof
		var fixDef = new b2FixtureDef;
		fixDef.density = 1;
		fixDef.friction = 0;
		fixDef.restitution = 0;
		
		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_staticBody;
		
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox(canvaswidth/2,2);
		
		bodyDef.position.Set(canvaswidth/2, 0);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		bodyDef.position.Set(canvaswidth/2, canvasheight);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		//create walls
		var fixDef2 = new b2FixtureDef;
		fixDef2.density = 1;
		fixDef2.friction = 0;
		fixDef2.restitution = 0;
		
		var bodyDef2 = new b2BodyDef;
		bodyDef2.type = b2Body.b2_staticBody;
		
		fixDef2.shape = new b2PolygonShape;
		fixDef2.shape.SetAsBox(2,canvasheight);
		
		bodyDef2.position.Set(0, canvasheight/2);
		world.CreateBody(bodyDef2).CreateFixture(fixDef2);
		
		bodyDef2.position.Set(canvaswidth, canvasheight/2);
		world.CreateBody(bodyDef2).CreateFixture(fixDef2);

		
		// Start dropping some shapes
		addCircle();

	    //setup debug draw
	    // This is used to draw the shapes for debugging. Here the main purpose is to 
	    // verify that the images are in the right location 
	    // It also lets us skip the clearing of the display since it takes care of it.

	 // The refresh rate of the display. Change the number to make it go faster
		z = window.setInterval(update2, (1000 / 500));

	 function addCircle() {
		 // create basic circle
         var bodyDef = new b2BodyDef;
		 var fixDef = new b2FixtureDef;
		 fixDef.density = 1;
		 fixDef.friction = 0;
		 fixDef.restitution = 1;
		 
		 var bodyDef = new b2BodyDef;
		 bodyDef.type = b2Body.b2_dynamicBody;
		 scale = 13;
		 fixDef.shape = new b2CircleShape(scale);
            bodyDef.position.x = (canvaswidth-scale*2)*Math.random() + scale*2;
	    	bodyDef.position.y = canvasheight- (scale*Math.random() +scale*2);
			
			
		var body = world.CreateBody(bodyDef).CreateFixture(fixDef);
		//body.GetBody().SetMassData(new b2MassData(new b2Vec2(0,0),0,50));
		body.GetBody().ApplyImpulse(
			new b2Vec2(-999999, 629393),
			body.GetBody().GetWorldCenter()
		);
	 }

	 // Update the world display and add new objects as appropriate
	 function update2() {
		world.Step(1 / 60, 10, 10);
		context.clearRect(0,0,canvaswidth,canvasheight);
	    	world.ClearForces();
	    
	    	processObjects();
	 }

	 // Draw the updated display
	 // Also handle deletion of objects
	 function processObjects() {
		 var node = world.GetBodyList();
		 while (node) {
			var b = node;
			node = node.GetNext();
			// Destroy objects that have floated off the screen
			var position = b.GetPosition();
			if (position.x < -deletionBuffer || position.x >(canvaswidth+4)) {
				world.DestroyBody(b);//inserir aqui o código pra dizer que o user perdeu
				continue;
		 	}

			// Draw the dynamic objects
			if (b.GetType() == b2Body.b2_dynamicBody) {

				// Canvas Y coordinates start at opposite location, so we flip
				var flipy = canvasheight - position.y;
				var fl = b.GetFixtureList();
				if (!fl) {
					continue;
				}
				var shape = fl.GetShape();
				var shapeType = shape.GetType();

				 // draw a circle - a solid color, so we don't worry about rotation
				 if (shapeType == b2Shape.e_circleShape) {
					context.strokeStyle = "#CCCCCC";
					context.fillStyle = "#FF8800";
					context.beginPath();
					context.arc(position.x,flipy,shape.GetRadius(),0,Math.PI*2,true);
					context.closePath();
					context.stroke();
					context.fill();
				 }

			 }
		 }
	 }

};

