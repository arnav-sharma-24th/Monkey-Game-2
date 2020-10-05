var monkey, monkey_running,monkeystop;
var ground
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var gameState=1
var PLAY=1;
var END=0;
var survivaltime = 0;

localStorage["HighestScore"] = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
monkeystop = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 600)
  monkey = createSprite(70, 250, 10, 10);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.15;

  ground = createSprite(200, 400, 1000, 10);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background("white");
  monkey.collide(ground);

  if(gameState===PLAY){
  
 
    if (keyWentDown("space")&& monkey.y>=240){
      monkey.velocityY = -20;
      
    }
     if (monkey.isTouching(bananaGroup)){
      score = score+1
      bananaGroup.destroyEach();
      
    }
  if (monkey.isTouching(obstacleGroup)){
    gameState = END;
    
    
    
    
  }
  
   stroke( "black");
textSize(20);
fill("black");
survivalTime=Math. ceil(frameCount/frameRate())
text("Survival Time: "+ survivalTime, 100,50);
 
    
  banana();
  obstacle();    
      
      
      
  }
  else if(gameState===END){
          
   bananaGroup.setVelocityXEach (0);
     bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach  (0);
    obstacleGroup.setLifetimeEach(-1);
    textSize(20);
    text("Press R to reset",200,200)
    survivaltime = 0;
    if(keyDown("r")){
     reset() ;  
    }
     
          
          }
  
  monkey.velocityY = monkey.velocityY + 1;
  
  drawSprites();
stroke( "black");
textSize(20);
fill("black");

text("Score: "+ score, 500, 50);



}

function banana(){
  if(frameCount%80==0){
    var banana = createSprite(650,13,13,13)
    banana.y =Math.round(random(200,300));
    banana.addImage("bruh",bananaImage);
    bananaGroup.add(banana) ;
    banana.scale=0.1;
    banana.lifetime=200;
    banana.velocityX = -3;
  }
  
}
  
function obstacle ()  {
  if(frameCount%60===0){
        var obstacle  = createSprite(650,0,12,12);
       obstacle.y =Math.round(random(220,390));
       obstacle.addImage("obs",obstacleImage)
        obstacleGroup.add(obstacle)
       obstacle.scale = 0.1;
      obstacle.lifetime = 200;
      obstacle.velocityX = Math.round(random(-14,-3))
  }
  
  
}
  
function reset(){
  gameState = PLAY;
  
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  survivaltime = 0;
}  

