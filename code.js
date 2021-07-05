var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerPaddle = createSprite(200,40,100,10);
 playerPaddle.shapeColor = "black";
var comPaddle = createSprite(200,360,100,10);
comPaddle.shapeColor = "black";

var goal1 = createSprite(200,380,120,20);
 goal1.shapeColor = "white";
var goal2 = createSprite(200,20,120,20);
 goal2.shapeColor = "white";
 
 var striker = createSprite(200,200,20,20);
 striker.shapeColor = "black";
 
 var scorePlayer = 0;
 var scoreCom = 0;
 var gameState = "serve";
 var s = "Press enter to start";
 

function draw(){
  background("green");
  
  //displaying Score
  textSize(19);
  stroke("white");
  text(scoreCom,15,220);
  text(scorePlayer,15,180);
  
  

  
  
  for(var i = 0; i < 400; i=i+30){
    line(i, 200, i+10, 200);
  }
  
  if(gameState == "serve"){
    //show welcome text 
    textSize(25);
    stroke("white");
    text(s,100,200);
    
    striker.x = 200;
    striker.y = 200;
    
    
    
    if(keyDown("enter")){
      striker.velocityX = 6;
      striker.velocityY = 5;
      gameState = "play";
      
    }
}

if((gameState == "play")){
  //moving paddles
  if((keyDown("right"))){
    playerPaddle.x = playerPaddle.x + 10;
}

if((keyDown ("left"))){
   playerPaddle.x = playerPaddle.x - 10;
}

comPaddle.x = striker.x;

if((striker.isTouching(topEdge))){
  gameState = "serve";
}

if((striker.isTouching(bottomEdge))){
  gameState = "serve";
}

  
  
  
}
 
 if((gameState == "game over")){
   textSize(25);
   text("game over",100,200);
   striker.velocityX = 0;
   striker.velocityY = 0;
 } 
 
 
  




createEdgeSprites();
striker.bounceOff(rightEdge);
striker.bounceOff(leftEdge);
striker.bounceOff(playerPaddle);
striker.bounceOff(comPaddle);

if((striker.isTouching(topEdge)) || (striker.isTouching(bottomEdge))){
    gameState = "game over";
  }

if((scoreCom == 5)|| (scorePlayer == 5)){
  gameState == "game over";
}

if((striker.isTouching(goal1))){
  scorePlayer = scorePlayer + 1;
  gameState = "serve";
}

if((striker.isTouching(goal2))){
  scoreCom = scoreCom + 1;
  gameState = "serve";
  
}



drawSprites();
}



// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
