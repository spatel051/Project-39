class Game {
  constructor(){

  }
  end(){
    console.log("Game Ended");
    background(255, 255, 255);
    form.end();
    /*textSize(50);
    fill("red");
    text("Game Over!", displayWidth/2, displayHeight/2);*/
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    rocket1 = createSprite(100,200);
    rocket1.addImage(rocket_img);
    rocket2 = createSprite(300,200);
    rocket2.addImage(rocket_img);
    rocket3 = createSprite(500,200);
    rocket3.addImage(rocket_img);
    rocket4 = createSprite(700,200);
    rocket4.addImage(rocket_img);
    rockets = [rocket1, rocket2, rocket3, rocket4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(198, 135, 103);
      image(space, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      var index = 0;
      var x = 175;
      var y;

      for(var plr in allPlayers){
        index = index + 1 ;

        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        rockets[index-1].x = x;
        rockets[index-1].y = y;

        if (index === player.index){
          camera.position.x = displayWidth/2;
          camera.position.y = rockets[index-1].y
        }
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
    }

    drawSprites();
  }
}
