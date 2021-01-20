var canvas = document.getElementById('game')
var context = canvas.getContext('2d');
var buttonD = document.getElementById("dButton")
var npcsprite = new Image();
npcsprite.src = "img/1to6.png"; // Frames 1 to 6
var gameOverBackground=new Image();
var killedPlayer =false;
gameOverBackground.src="img/gameOver.jpg";
var background=new Image();
background.src="img/Background.jpg";
var sprite = new Image();
sprite.src = "img/lab6sprite.png"; // Frames 1 to 6




function GameObject(name, img, health,Scale) {
  this.name = name;
  this.img = img;
  this.health = health;
  this.x = 0;
  this.y = 0;
  this.Scale=Scale;
}
function GamerInput(input) {
  this.action = input;
}



// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input
let daySwicth=0;
// Default Player
var player = new GameObject("player",sprite,100);
var sceneState=0;


// Gameobjects is a collection of the Actors within the game

  var gameobjects = [player, new GameObject("NPC",npcsprite, 100,700,700)];



// Process keyboard input event
function input(event) {
  // Take Input from the Player
   console.log("Input");
   //console.log("Event type: " + event.type);

  if (event.type === "keydown") {
      switch (event.keyCode) {
          case 37:
              gamerInput = new GamerInput("Left");
              break; //Left key
          case 38:
              gamerInput = new GamerInput("Up");
              break; //Up key
          case 39:
              gamerInput = new GamerInput("Right");
              break; //Right key
          case 40:
              gamerInput = new GamerInput("Down");
              break; //Down key
          default:
              gamerInput = new GamerInput("None"); //No Input
      }
  } else {
      gamerInput = new GamerInput("None"); //No Input
  }
  // console.log("Gamer Input :" + gamerInput.action);
}

document.getElementById("wButton").onmouseup = function() {ButtonUp()};
document.getElementById("aButton").onmouseup = function() {ButtonUp()};
document.getElementById("dButton").onmouseup = function() {ButtonUp()};
document.getElementById("sButton").onmouseup = function() {ButtonUp()};

function moveRight()
{
	gamerInput = new GamerInput ("Right");
}
function moveLeft()
{	
	gamerInput = new GamerInput ("Left");
}
function moveUp()
{
	gamerInput = new GamerInput ("Up");
}

function moveDown()
{
	gamerInput = new GamerInput ("Down");
}
function ButtonUp()
{
	gamerInput = new GamerInput("None");
}

function update() {
  // Iterate through all GameObjects
  // Updating position and gamestate
  // console.log("Update");


  if (gamerInput.action === "Down") 
  {
    gameobjects[0].x +=3;
  }
  
  if (gamerInput.action === "Up") 
  {
  gameobjects[0].y -=3;  
  
  }
  
  if(gamerInput.action === "Left")
  {
  gameobjects[0].x -=3;
  }
  
  if(gamerInput.action === "Right")
  {
  gameobjects[0].y +=3;
  }
  

  if(gameobjects[0].x > gameobjects[1].x)
  {
    gameobjects[1].x +=1;
  }
  
  
  if(gameobjects[0].x < gameobjects[1].x)
  {
    gameobjects[1].x -=1;
  }
  
  
  if(gameobjects[0].y > gameobjects[1].y)
  {
    gameobjects[1].y +=1;
  }
  
  
  if(gameobjects[0].y < gameobjects[1].y)
  {
    gameobjects[1].y -=1;
  }

  moveThroughWalls();
}



var x = 0, y = 1300;
// Total Frames
var frames = 6;

// Current Frame
var currentFrame = 0;
// X axis to Draw from
var sprite_x = 0;

// Initial time set
var initial = new Date().getTime();
var current; // current time

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height); 
  current = new Date().getTime(); // update current
  if (current - initial >= 300) { // check is greater that 500 ms
      currentFrame = (currentFrame + 1) % frames; // update frame
      initial = current; // reset initial
  } 

  //always draw the background
  
 
   if(killedPlayer===false)
  {
    context.drawImage(background,0,0,400,400,0,0,890,500);
    context.drawImage(sprite, (sprite.width/6 ) * currentFrame, 0, 100, 100, gameobjects[0].x, gameobjects[0].y, 90,90);
    context.drawImage(npcsprite, (npcsprite.width  /6) * currentFrame, 0, 100, 100, gameobjects[1].x, gameobjects[1].y, 90, 90);
  }
  else
  {
    context.drawImage(gameOverBackground,0,0,400,400,0,0,1080,1000);
  }
 
 

//context.drawImage(gameobjects[0].img, (gameobjects[0].img.width / frames) * currentFrame, 0, 90, 90, 300, 300, 290, 290);
  if(gameobjects[0].x == gameobjects[1].x && gameobjects[0].y == gameobjects[1].y)
  {
  gameobjects[1].x = 600;
  gameobjects[1].y = 10;
  }
}


var url=document.location.href;
var gamertag;
function onPageLoad() {
 
  var result= url.split("=");

  var href = window.location.href;
 // alert(result[1]);
  gamertag=result[1];
  var hellomsg="Hello ";
  var  entermsg=hellomsg.concat(gamertag);
  alert(entermsg);
  
}


function buttonOnClick() {
  // alert("Booooommmmmm!!!");
  console.log("Button Pressed");
}
function collsions(){
  var collisionX = gameobjects[1].x - gameobjects[0].x;
  var collisionY = gameobjects[1].y - gameobjects[0].y;

 if(collisionX < 30 && collisionY <10)
   {

   // gameobjects[1].health = gameobjects[1].health - 1;
   sceneState=1;
   killedPlayer=true;
    console.log("ouch");
    
  console.log("collided");
  }
  else{
   
    
    sceneState=0;
  }


}

// Update Heads Up Display with Weapon Information
function weaponSelection() {
  var selection = document.getElementById("equipment").value;
  var active = document.getElementById("active");
  if (active.checked == true) {
    document.getElementById("HUD").innerHTML = selection + " active ";
    console.log("Weapon Active");
  } else {
    document.getElementById("HUD").innerHTML = selection + " selected ";
    console.log("Weapon Selected");
  }
}

// Draw a HealthBar on Canvas, can be used to indicate players health
function drawHealthbar() {
  var width = 100;
  var height = 20;
  var max = 100;
  var val = 10;

  // Draw the background
  context.fillStyle = "#0000FF";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, width, height);

  // Draw the fill
  context.fillStyle = "#00FF00";
  var fillVal = Math.min(Math.max(val / max, 0), 1);
  context.fillRect(0, 0, fillVal * width, height);
}

// Array of Weapon Options
var options = [{
    "text": "Select a Weapon",
    "value": "No Weapon",
    "selected": true
  },
  {
    "text": "Spear",
    "value": "Javelin"
  },
  {
    "text": "Sword",
    "value": "Longsword"
  },
  {
    "text": "Crossbow",
    "value": "Pistol crossbow"
  }
];

var selectBox = document.getElementById('equipment');

for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}
function moveThroughWalls(){ 
  if(gameobjects[0].x>=800)
  {
    gameobjects[0].x=0
  }
  else if(gameobjects[0].x<=0)
  {
    gameobjects[0].x<=800
  }
  if(gameobjects[0].y>=400)
  {
    gameobjects[0].x=0
  }
  else if(gameobjects[0].x<=0)
  {
    gameobjects[0].y<=400
  }

}

function gameloop() {
  update();
 // onPageLoad();
  drawHealthbar();

  animate();
  collsions();
 
  window.requestAnimationFrame(gameloop);


}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);
window.addEventListener('keyleft', input);
window.addEventListener('keyright', input);
