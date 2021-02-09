const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var engine, world;
var bgi1,bgi2;
var button,butimg;
var jacky,jackimg,bird,birdsGroup;
var sound,sound2,sound3,sound4,sound5;
var gamestate="start"
var heart,heartImage,heart1,heart2,heart3;
var Lifeline;
var home,score=0;
var death=0;
var bg1,bg2,bg3;
var alien,gameover,gameimg;
var restart,restimg;
var sound7,sound8;
function preload(){
bgi1=loadImage("bg1.jpg")
jackimg=loadImage("p.png")
bgi2=loadImage("bg2.jpg")
bird=loadImage("bird.png")
alien=loadAnimation("alien1.png","alien1.png","alien2.png","alien2.png")
coin=loadAnimation("coin1.png","coin2.png","coin3.png")
bulimg=loadImage("bullet.png")
buttonimg=loadImage("icon3.png")
sound=loadSound("sound.mp3")
sound2=loadSound("music.mp3")
sound3=loadSound("sound3.mp3")
sound4=loadSound("b.mp3")
sound5=loadSound("coin.mp3")
sound6=loadSound("sound6.mp3")
homeimg=loadImage("home.png")
bg3i=loadImage("bg31.png")
gameimg=loadImage("game.png")
heartImage=loadImage("pink.png");
restimg=loadImage("reset.png")
sound7=loadSound("sound7.mp3")
sound8=loadSound("sound8.wav")
magnetimage=loadImage("magnet.png")
}
function setup() {
  createCanvas(1300,545);
  engine = Engine.create()
  world = engine.world;
//background at start
bg1=createSprite(600,300,1300,600)
bg1.addImage("bg",bgi1)
bg1.scale=1.3
//background at play
bg2=createSprite(600,10,1200,600)
bg2.addImage("bg",bgi2)
bg2.scale=1.3
bg2.visible=false
bg2.velocityX = -10

bg3=createSprite(700,100,1200,600)
bg3.addImage("bg",bg3i)
bg3.scale=1.6
bg3.visible=false
bg3.velocityX = -26

//The player
jacky=createSprite(600,300)
jacky.addImage("jack",jackimg)
jacky.scale=0.2;
jacky.visible=false

//groups for the non players
birdsGroup=createGroup()
coinsGroup=createGroup()
bulletGroup=createGroup()
aliensGroup=createGroup()

button=createSprite(600,300)
button.addImage("play",buttonimg)
button.scale=0.2

home=createSprite(1250,60)
home.addImage("play",homeimg)
home.scale=0.2
home.visible=false
//Hearts
heart1=createSprite(300,90,20,20);
heart1.addImage("heart",heartImage);
heart1.scale=0.1;   
heart1.visible=false

heart2=createSprite(350,90,20,20);
heart2.addImage("heart",heartImage);
heart2.scale=0.1;   
heart2.visible=false

heart3=createSprite(400,90,20,20);
heart3.addImage("heart",heartImage);
heart3.scale=0.1;
heart3.visible=false

magnet=createSprite(600,90,20,20);
magnet.addImage("Magnet",magnetimage);
magnet.scale=0.1;
magnet.visible=false


death=3;
score=0;
}

function draw() {
  Engine.update(engine);
  background("white");  
//GAME STATE = START
 if(gamestate==="start"){

  home.visible=false
  jacky.visible=false
  bg2.visible=false
  bg1.visible=true
  button.visible=true
  text.visible=false
  
//when we press the button
if(mousePressedOver(button)){
  sound.play()
  sound2.play()
  gamestate="play"
}



 }
//GAME STATE = PLAY
 else if(gamestate==="play"){
//sounds
//sound.play()
//sound2.play()
text=createElement("h3")
text.html("SCORE : "+score)
text.position(100,100)
text.style('width', '100px');
text.style('height', '20px');
text.style('background','pink')
text2=createElement("h3")
text2.html("Lifetime : "+death)
text2.position(330,120)
text2.style('width', '110px');
text2.style('height', '20px');
text2.style('background','blue')

home.visible=true
jacky.visible=true
bg2.visible=true
bg1.visible=false
button.visible=false
heart1.visible=true
heart2.visible=true
heart3.visible=true
magnet.visible=true
//Magnet
if(jacky.isTouching(magnet)){ 
coinsGroup.destroyEach()
magnet.visible=false
score=score+10
}
//making background as never ending background
if (bg2.x < 0){bg2.x = bg2.width/2;}
if (bg3.x < 0){bg3.x = bg3.width/2;}
 //giving condition for moving jacky 
 jacky.velocityY=0
 if(keyDown("UP_ARROW")){jacky.velocityY=-12 }
if(keyDown("DOWN_ARROW")){ jacky.velocityY=+12}
//spawning the birds
spawnbirds()
//spawning coins
spawncoins()
//spawning aliens
spawnaliens()
//bullets
if (keyDown("space")) { 
  createBullet();
  sound3.play()
}
//destroying
if (bulletGroup.isTouching(aliensGroup)) {
 sound4.play()
bulletGroup.destroyEach();
aliensGroup.destroyEach();
death=death-1
}
//coins
for (var i = 0; i < coinsGroup.length; i++) {
  if (coinsGroup.get(i).isTouching(jacky)) {
      coinsGroup.get(i).destroy();
      sound5.play()
        score=score+10
      
  }
}
//aliens
for (var i = 0; i < aliensGroup.length; i++) {
  if (aliensGroup.get(i).isTouching(jacky)) {
      aliensGroup.get(i).destroy();
      sound7.play()
      death=death-1
  }
}
//Death
if(death===2){heart1.visible=false}
if(death===1){
  heart2.visible=false;
  heart1.visible=false
}
if(death===-1){ 
  heart3.visible=false
  heart2.visible=false;
  heart1.visible=false
  gamestate="end"
}
//Home
if(mousePressedOver(home)){
sound.play()
gamestate="start"
sound2.stop()
bg3.visible=false
heart1.visible=false
heart2.visible=false
heart3.visible=false
sound6.stop()

}
if(score===50){
sound2.stop()
bg2.visible=false
bg3.visible=true
jacky.visible=true
sound6.play()
}
 }
 else if(gamestate==="end"){
   sound2.stop()
   bg2.velocityX=0
   bg3.velocityX=0
 // sound8.play()
 heart3.visible=false
 heart2.visible=false;
 heart1.visible=false
  gameover=createSprite(600,300)
  gameover.addImage("game",gameimg)
  gameover.scale=1
}
 
drawSprites()


}


function spawnbirds() {
  
  if (frameCount % 200 === 0) {
    var birds = createSprite(1000,160,40,10);
    birds.y = Math.round(random(80,120));
    birds.addImage(bird);
    birds.scale = 0.02;
    birds.velocityX = -3;
    birds.lifetime = 400;
    
     birdsGroup.add(birds);
  }
}
function spawncoins() {

  if (frameCount % 200 === 0) {
    var coins = createSprite(1200,10)
    coins.y = Math.round(random(20,370));
    coins.addAnimation("coin",coin);
    coins.scale = 0.3;
    coins.velocityX = -3;
    coins.lifetime = 400;
    coinsGroup.add(coins);
     
  }
  }
  function spawnaliens() {

    if (frameCount % 300 === 0) {
      var aliens = createSprite(1000,160)
      aliens.y = Math.round(random(20,370));
      aliens.addAnimation("alien",alien);
      aliens.scale = 0.4;
      aliens.velocityX = -3;
    
      aliens.lifetime = 400;
      aliensGroup.add(aliens);  
    }
    }
  function createBullet() {
    var bullet= createSprite(400, 100, 60, 10);
    bullet.addImage(bulimg);
    bullet.x =jacky.x
    bullet.y=jacky.y;
   
    bullet.velocityX = 4;
    bullet.lifetime = 200;
    bullet.scale = 0.1;
    bulletGroup.add(bullet)
    return bullet;
    
  }
  