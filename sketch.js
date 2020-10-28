var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
//var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight=300;
var score = 0;
var balls, turn = 0;
var gameState = "play";

var particle = null;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }  
}
 


function draw() {
  background(mouseY, mouseX, random(39, 180));
  textSize(20)
 //text("Score : "+score,20,30);
  Engine.update(engine);
  textSize(30);
  fill("blue");
  text("Turns taken: "+turn, 300, 30);
  text("Score: "+score, 50, 30);

  textSize(25);
  fill("lightgreen");
  text("500", 20, 530);
  text("500", 100, 530);
  text("500", 180, 530);
  text("500", 260, 530);
  text("500", 500, 530);
  text("500", 580, 530);
  text("500", 660, 530);
  text("500", 740, 530);
  text("100", 340, 530);
  text("100", 420, 530);   
  
   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
     
   }
   /*
   if(frameCount%60===0){
     particles.push(new particle(random(width/2-30, width/2+30), 10,10));
     score++;
   }
   */
  ground.display();
  if(gameState==="end"){
    textSize(30);
    textFont("Consolas");
    fill(mouseX, mouseY, random(0, 255));
    text("Game Over", 360, 150);
  }
  if(particle!==null){
    particle.display();
    if(particle.body.position.y>760){
      if(particle.body.position.x < 300){
        score = score + 500;
        particle = null; 
        if(turn>=5){
          gameState = "end";
        }
      }
      else if(particle.body.position.x < 500 && particle.body.position.x > 301){
        score = score + 100;
        particle = null; 
        if(turn>=5){
          gameState = "end";
        }
      }
      else if(particle.body.position.x < 800 && particle.body.position.x > 501){
         score = score + 500;
         particle = null; 
         if(turn>=5){
           gameState = "end";
         }
      }
    }
  }
   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }
}
function mousePressed(){
  if(gameState === "play"){
    turn = turn + 1;
    particle = new Particle(mouseX, 10, 10);
  }
}