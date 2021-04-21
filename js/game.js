
//canvas variables setup
var canvas= document.getElementById("theCanvas");
var context= canvas.getContext("2d");

//starting background variables

var backgroundImageOutside=new Image();
backgroundImageOutside.src="img/backgroundOutsideCastle.jfif"

//player setup sprite variables
var playerSprite=new Image();
var playername="knight";
playerSprite.src="img/knight2.png"

var Weapon=new Image();
Weapon.src="img/weaponEmpty.png"

//enemy sprite variables
var enemySprite=new Image();
enemySprite.src="img/toothless.png"

//animation variables
var current=0;
var currentFrame=0;
var initial=new Date().getTime();;
var frames=6;

//player array setup
var player = new PlayerObject("player",playerSprite,100);
var characterArray=[player, new PlayerObject("enemy",enemySprite,100,500,500)];

//shield variables
var shieldImage=new Image();
shieldImage.src="img/force_field.png"
var shieldSelected=false;

//player original posiiton
var knightPositionX=50;
var knightPositionY=290;

//player strecth values
var player_startPos=250;
var player_startPosY=550;

//weapon variables
var playerAttack=false;


//enemy weapons variables toothless and wizard
var fireballSprite=new Image();
fireballSprite.src="img/toothless_fire.png"
var enemyfireBallSpawnX=characterArray[1].x;
var enemyfireBallSpawnY=characterArray[1].y;
//turn rotation variables
//if it equals true it is the players turn if it equals false it is not the players turn
var playersTurn=true;
var fireBallShot=false;


var WeaponPositionX=0;
var WeaponPositionY=0;
var maceMove=true;

//weapon object class
function weaponObject(name, health){
    this.name=name;
     this.x=10;
     this.y=10;
     this.health=health;
     this.scale=1;
 
 
}
//player object class
function PlayerObject(name, health){
   this.name=name;
    this.x=10;
    this.y=10;
    this.health=health;
    this.scale=1;

}


//player animation function
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height); 
    current = new Date().getTime(); // update current
    if (current - initial >= 300) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 

    context.drawImage(backgroundImageOutside,0,0,450,400);
   
    context.drawImage(enemySprite,characterArray[1].x,characterArray[1].y,100,100);
    
    context.drawImage(playerSprite,playerSprite.width/6*currentFrame,0,player_startPos,player_startPosY,knightPositionX,knightPositionY,100,100);

    
    if(playersTurn==false&&fireBallShot==false){

        context.drawImage(fireballSprite,enemyfireBallSpawnX,enemyfireBallSpawnY,20,20);
    }
 WeaponPositionX=knightPositionX+20;
 WeaponPositionY=knightPositionY-20;
    context.drawImage(Weapon,WeaponPositionX,WeaponPositionY);
    if(shieldSelected==true)
    {
        context.drawImage(shieldImage,knightPositionX,knightPositionY,100,100);
    }
    
}
function attack(){
    shieldSelected=false;
    console.log("entering attack function")
    playersTurn=false;
    playerAttack=true;
    
    }

    var gameObjects = {
        'positionX': 1,
        'positionY': 2,
        'score': 3
      };

        // Game objects as JSON
  localStorage.setItem('gameObjects', JSON.stringify(gameObjects));

  // Retrieve Games object as from storage
  var npcObjects = localStorage.getItem('gameObjects');

  console.log('PLAYER_OBJECTS: ', JSON.parse(npcObjects));

  // Reading Level Information from a file
  var readJSONFromURL = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';

    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };

    xhr.send();
  };

  readJSONFromURL('./data/level.json', function (err, data) {
    if (err != null) {
      console.error(err);
    } else {
      var text = data["positionX"];
      console.log(text);
      var text = data["positionY"];
      console.log(text);
      var text = data["score"];
      console.log(text);
    }
  });

  // local storage function
  function updateScore(){
    var score=localStorage.getItem('score');
    if (isNaN(score)) {
      localStorage.setItem('score', 0);
        document.getElementById("SCORE").innerHTML = " [ " + score + " ] ";
    } else {
        localStorage.setItem('score', parseInt(score)+1);
       document.getElementById("SCORE").innerHTML = " [ " + score + " ] ";
    }
   
  }
 
//weapon selection function 
function weaponSelection(){
    var selection = document.getElementById("equipment").value;
    var active = document.getElementById("active")

    if (active.checked == true) {
      document.getElementById("HUD").innerHTML = selection + " active ";
      console.log("Weapon Active");
    } else {
      document.getElementById("HUD").innerHTML = selection + " selected ";
      console.log("Weapon Selected");
    }

    if(selection=="mace")
    {
        Weapon.src="./img/maceFinished.png";
        console.log("yolo");
        maceMove=false;
    }
    else if(selection=="sword")
    {
        Weapon.src="./img/swordFinished.png";
        console.log("yoloWWWWW");

    }
    
          
       
    
}
//weapon selection variables
var options = [{
    "text": "Select a Weapon",
    "value": "No Weapon",
    "selected": true
  },
  {
    "text": "Mace",
    "value": "mace"
  },
  {
    "text": "Sword",
    "value": "sword"
  },
 
];

var selectBox = document.getElementById('equipment');

for (var i = 0; i < options.length; i++) {
  var option = options[i];
  selectBox.options.add(new Option(option.text, option.value, option.selected));
}


//enemy basic movement
function enemyMovement(){

    characterArray[1].x+=1;
    if(characterArray[1].x>=310)
    {
        characterArray[1].x=10;
    }
    
}

//player attck function will function properly eventually

function weaponAttack(){
    if(playerAttack==true&& maceMove==false)
        {
            console.log("start the yolo  attack")
            if(WeaponPositionX<enemyfireBallSpawnX)
            {
                WeaponPositionX++;
            }
            if(WeaponPositionY<enemyfireBallSpawnY)
            {
                WeaponPositionY++;
            }
            if(WeaponPositionX>enemyfireBallSpawnX)
            {
                WeaponPositionX--;
            }
            if(WeaponPositionY<enemyfireBallSpawnY)
            {
                WeaponPositionY--;
            }
        }
    
}
//player shield function that applies the players shield
function shield(){
    shieldSelected=true;
    console.log("entering function")
}
//player function to move the player right upon button click
function dodgeRight(){
    knightPositionX=knightPositionX+30;
    console.log("entering dodge function")
}

//player function to move the player left upon button click
function dodgeLeft(){
    knightPositionX=knightPositionX-30;
    console.log("entering dodge function")
    
}

//player health bar which will appear above the player               
function makeHealthBar(){
console.log("makehealthbar");
}
//function that swicthes the turns of the player vs the ai
function turnRotation(){
    // the player has the first go
    console.log("fireball throw");
    if(playersTurn==false){
        if(enemyfireBallSpawnX<knightPositionX)
        {
            enemyfireBallSpawnX++;
        }
        if(enemyfireBallSpawnY<knightPositionY)
        {
            enemyfireBallSpawnY++;
        }
        if(enemyfireBallSpawnX.x>knightPositionX)
        {
            enemyfireBallSpawnX--;
        }
        if(enemyfireBallSpawnY>knightPositionY)
        {
            enemyfireBallSpawnY--;
        }
    }
   
 
}
// function to transfer playerNAme to game

function checkCollsions(){
    //for collisions between the player and the dragons fireball only
    if(enemyfireBallSpawnY==knightPositionY&&enemyfireBallSpawnX==knightPositionX){
        console.log("fireBallCollided");
        fireBallShot=true;
        playersTurn=true;
    }
}
updateScore();
//the base game loop 
function GameLoop()
{
    weaponAttack();
    turnRotation();
    checkCollsions();
    enemyMovement();
    animate();// not only animate but draws to the canvas as well
 
   window.requestAnimationFrame(GameLoop);
}

window.requestAnimationFrame(GameLoop);
