var canvas, backgroundImage;

var gameState = 0;
var playerCount;

var database;

var allPlayers;

var form, player, game;

var cars,car1,car2,car3,car4;
var track,car1_img,car2_img,car3_img,car4_img,backgroundImg;

var leaderBoard;
var carSound;

function preload(){
  track = loadImage("images/track.jpg");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  car4_img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  backgroundImg = loadImage("images/background.jpg");
  cup = loadImage("images/Leaderboard.png");
  carSound = loadSound("sounds/car-racing.mp3");
}


function setup(){
  canvas = createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  console.log("Window " + windowHeight);
  console.log("Display " + displayHeight);

  leaderBoard = createSprite(displayWidth/2,-(displayHeight*4+100));
  leaderBoard.addImage(cup);
  leaderBoard.scale=0.7;
  //leaderBoard.visible=false;
}


function draw(){
  //background(backgroundImg);
  console.log("player count " + playerCount);
  if(playerCount === 4){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
  }


}
