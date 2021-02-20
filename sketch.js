var canvas, backgroundImage;
var gameState = 0, playerCount, allPlayers;
var distance = 0, database;
var form, player, game;
var rockets, rocket1, rocket2, rocket3, rocket4;
var space, rocket_img;

function preload(){
  space = loadImage("images/space.jpg");
  rocket_img = loadImage("images/rocket.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
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
