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
		
		bodyDef.position.Set(canvaswidth/2, -30);
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
		
		
		//create the paddle
		
		var bodyDefPaddle = new b2BodyDef;
		bodyDefPaddle.type = b2Body.b2_dynamicBody;
		bodyDefPaddle.position.Set(canvaswidth/2, 20);
		var fixDefPaddle = new b2FixtureDef;
		 fixDefPaddle.density = 1;
		fixDefPaddle.friction = 0;
		fixDefPaddle.restitution = 1;
		
		fixDefPaddle.shape = new b2PolygonShape;
		fixDefPaddle.shape.SetAsBox(95,10);
		 
		world.CreateBody(bodyDefPaddle).CreateFixture(fixDefPaddle);
		
		// Start dropping some shapes
		addCircle();
		for (var i=0; i<4;i++){	
			for(var j=0; j<15;j++ ){
				addBlock(20+(36*j),350 - 36*i);
			}
		}
		
		
		
		
		
		
		//If mouse is moving over the thing
    $(canvas).mousemove(function(e)
    {
        var p = get_real(new b2Vec2(e.pageX/scale, e.pageY/scale))
         
        mouse_x = p.x;
        mouse_y = p.y;
         
        if(mouse_pressed && !mouse_joint)
        {
            var body = GetBodyAtMouse();
             
            if(body)
            {
                //if joint exists then create
                var def = new b2MouseJointDef();
                 
                def.bodyA = ground;
                def.bodyB = body;
                def.target = p;
                 
                def.collideConnected = true;
                def.maxForce = 1000 * body.GetMass();
                def.dampingRatio = 0;
                 
                mouse_joint = world.CreateJoint(def);
                 
                body.SetAwake(true);
            }
        }
        else
        {
            //nothing
        }
         
        if(mouse_joint)
        {
            mouse_joint.SetTarget(p);
        }
    });
     
    $(canvas).mousedown(function()
    {
        //flag to indicate if mouse is pressed or not
        mouse_pressed = true;
    });
     
    /*
        When mouse button is release, mark pressed as false and delete the mouse joint if it exists
    */
    $(canvas).mouseup(function()
    {
        mouse_pressed = false;
         
        if(mouse_joint)
        {
            world.DestroyJoint(mouse_joint);
            mouse_joint = false;
        }
    });
		
		
		
		
		
		
		

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
		 
		 bodyDef.type = b2Body.b2_dynamicBody;
		 scale = 9;
		 fixDef.shape = new b2CircleShape(scale);
		 
		 bodyDef.position.Set(canvaswidth/2,canvasheight/2);
			
			
		var body = world.CreateBody(bodyDef).CreateFixture(fixDef);
		body.GetBody().ApplyImpulse(
			new b2Vec2(600000, -777777),
			body.GetBody().GetWorldCenter()
		);
	 }
	 
	function addBlock(x,y) {
		 // create basic block
         var bodyDef = new b2BodyDef;
		 var fixDef = new b2FixtureDef;
		 fixDef.density = 1;
		 fixDef.friction = 0;
		 fixDef.restitution = 1;
		 
		 bodyDef.type = b2Body.b2_kinematicBody;
		 scale = 13;
		 
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox(30,15);

		bodyDef.position.Set(x,y);
		var body = world.CreateBody(bodyDef).CreateFixture(fixDef);
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
			//if (position.x < -deletionBuffer || position.x >(canvaswidth+4)) {
				//world.DestroyBody(b);//inserir aqui o código pra dizer que o user perdeu
				//continue;
		 	//}

			// Draw the dynamic objects
			if (b.GetType() == b2Body.b2_dynamicBody) {//desenhando os objetos que se movem

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
					
					if(position.y < 0){
						//window.alert("perdeu!");
					}
					
				 }
				 else if(shapeType == b2Shape.e_polygonShape && b.GetType() == b2Body.b2_dynamicBody){
						context.strokeStyle = "#a4a4a4";
						context.fillStyle = "#a122FF";
						context.beginPath();
						context.rect(position.x, flipy, 95, 10);
						context.closePath();
						context.stroke();
						context.fill();
						
	
				 }

			 }
			 else if(b.GetType() == b2Body.b2_kinematicBody){//desenhando os blocos
				// Canvas Y coordinates start at opposite location, so we flip
				var flipy = canvasheight - position.y;
				var fl = b.GetFixtureList();
				if (!fl) {
					continue;
				}
				var shape = fl.GetShape();
				var shapeType = shape.GetType();

				 // draw the blocks
				 if (shapeType == b2Shape.e_polygonShape) {
					context.strokeStyle = "#a4a4a4";
						context.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
						context.beginPath();
						context.rect(position.x, flipy, 30, 15);
						context.closePath();
						context.stroke();
						context.fill();
				 
				 }
				
			 }
			var edge = b.GetContactList();
			while (edge)  {
				var other = edge.other;
				if (other.GetType() == b2Body.b2_kinematicBody) {
					var othershape = other.GetFixtureList().GetShape();
					if (othershape.GetType() == b2Shape.e_polygonShape) {
						world.DestroyBody(other);
						break;	
					 }
				 }
				 edge = edge.next;
			}
		 }
	 }

};

