class Game {
  constructor(){}
  
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

      image(backgroundImg,0,0,displayWidth,displayHeight);
      player = new Player();

      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1_img);
    car2 = createSprite(300,200);
    car2.addImage(car2_img);
    car3 = createSprite(500,200);
    car3.addImage(car3_img);
    car4 = createSprite(700,200);
    car4.addImage(car4_img);

    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Starts",120,100);
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){

      background(44,44,44);
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

      var index=0;
      var x=170;
      var y;
      //var display_position = 130;

      for(var plr in allPlayers){
        index = index+1;

        x= x+200;

        y = displayHeight - allPlayers[plr].distance -50;

        cars[index-1].x = x;
        cars[index-1].y = y;

        console.log("player index " + player.index);
        if(index === player.index){
          cars[index-1].shapeColor = "red";
          camera.position.x=displayWidth/2;
          camera.position.y=cars[index-1].y;
          console.log("y value :"+ player.distance);
          fill("red");
          ellipse(x,y,60,60);
        }
       
      }
    }

    if(keyDown(UP_ARROW) && player.index!== null){
      carSound.play();
      player.distance +=50;
      player.update();
    }

    if(player.distance > 3500){
      gameState = 2;
      player.rank +=1;
      Player.updateCarsAtEnd(player.rank);

    }

    drawSprites();
  }

  end(){
    console.log("Game Eneded");
    //leaderBoard.visible=true;
    fill("blue");
    textSize(20);
    //text(player.rank,690,-2910);
    console.log(displayWidth/2-20);
    console.log(-(displayHeight*4+30));
    text(player.rank,displayWidth/2-20,-(displayHeight*4+30));
  }
}
