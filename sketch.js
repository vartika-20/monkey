
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survivalTime=0;
var gameState="PLAY";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400); 
  monkey=createSprite(80,330,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,370,800,20);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  
  foodGroup= new Group();
  obstacleGroup= new Group();
}

function draw() {
  background("green");
  
 // stroke("white");
 // textSize(20);
 // fill("white");
 // text("score: "+score,100,70);
  
   stroke("white");
  textSize(20);
  fill("black");
  survivalTime= Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,200,50);
   
  monkey.collide(ground);
  
  if(gameState=== "PLAY"){    
  if(ground.x<0){
     ground.x=ground.width/2;
     }
   
  if(keyDown("space")&& monkey.y>=300){
     monkey.velocityY=-15;
     }
  //to add gravity
  monkey.velocityY =monkey.velocityY +0.8;
     
  food();
  spawnObstacles();
  
   if(obstacleGroup.isTouching(monkey)){
     gameState="END";
   }
  }
  
  if(gameState==="END"){
     ground.velocityX=0;
     
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0); 
    }
 
  
  drawSprites();
}

function food(){
  if(frameCount% 80===0){
    banana= createSprite(400,120,20,20);
    banana.addImage("yellow",bananaImage);
    banana.y= Math.round(random(120,200));
    banana.velocityX=-5;
    banana.scale=0.15;
    banana.lifetime=80;
    
    foodGroup.add(banana);
     
     }
}

function spawnObstacles(){
  if(frameCount%300===0){
     obstacle= createSprite(400,335,20,20);
     obstacle.addImage("obstacle",obstacleImage);
     obstacle.scale=0.15;
     obstacle.velocityX=-5;
     obstacle.lifetime=90;
    
     obstacleGroup.add(obstacle);
     }
}




