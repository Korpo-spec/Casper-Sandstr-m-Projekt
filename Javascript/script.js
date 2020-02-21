
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
const img =  document.querySelectorAll(".Balloon");
let lastUpdate = Date.now();
let myInterval = setInterval(tick, 0);
let enemies = new Array();
let towers = new Array();
let shots = new Array();
document.getElementById("startbutton").addEventListener("click", ButtonClicked);
const createTower = document.getElementById("createTower");
createTower.addEventListener("click", CreateTower);
canvas.addEventListener("click", PlaceTower);
document.getElementById("Restart").addEventListener("click", Restart);

let start = false;

function Restart(){
    location.reload();
}

var positionInfo = canvas.getBoundingClientRect();
var height = positionInfo.height;
var width = positionInfo.width;

let mouseDividerY = 1400/ width;
let mouseDividerX = 900/ height;

canvas.height = 900;
canvas.width = 1400;

canvas.style.height = height;
canvas.style.width = width;


function tick() {
    let now = Date.now();
    let dt = now - lastUpdate;
    lastUpdate = now;

    try {
        Draw(dt);
    } catch (error) {
        
    }
    
}

let path = [[29, 1],[80, -2],[60, 1],[10, 2],[100, 1], [80, -2] ,[140,1]];
//let enemy = new Enemy([10,20], 50, 1, path);

let deltaTime = 0;

function Draw(dt) {

    let division = dt/1000;
    deltaTime += division;
    if (deltaTime > 0.7 && start) {
        let enemy = new Enemy([1,8], 50, 10, path);
        enemies.push(enemy);
        deltaTime = 0
    }
    enemies.forEach(enemy =>{
        if (enemy.health < 0) {
            enemies.splice(enemies.indexOf(enemy), 1);
        }
        enemy.clearDraw();
    });
    towers.forEach(tower => {
        tower.clearDraw();
    });
    towers.forEach(tower => {
        let shot = tower.Shoot(enemies, division);
        /*
        if (shot != null) {
            shots.push(shot); 
            shot.Draww();
        }
        */
        

    });
    

    
    
    

    //console.log(shots);
    if (shots.length > 1) {
        shots.forEach(shot => {
            
        });
    }
    

    enemies.forEach(enemy => {
        
        enemy.Draw(division);
    });
    
    enemies.forEach(enemy => {
        if (enemy.position[0] > 140) {
            enemies.splice(enemies.indexOf(enemy), 1);
        }
        
    });



}

function ButtonClicked() {

    let enemy = new Enemy([10,10], 50, 15, path);
    enemies.push(enemy);
    start = true;
    
}
let towerPlacement = 1;
CreateTower();
function CreateTower() {
    if (towerPlacement == 0) {
        createTower.style.backgroundColor = "Red";
        towerPlacement = 1;
    }
    else{
        createTower.style.backgroundColor = "White";
        towerPlacement = 0;
    }
    
    
    
    
    
    
}

function PlaceTower(){
    if (towerPlacement == 1) {
        let tower = new Tower([Math.floor( mousePos.x/10*mouseDividerX),(mousePos.y/10*mouseDividerY)], 40, 0.5, 30, 0);
        
        towers.push(tower);
        context.fillStyle = "#000000";
         
    }
}
 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let mousePos;

let mouseDown = false;
document.body.onmousedown = function() { 
  mouseDown = true;
}
document.body.onmouseup = function() {
  mouseDown = false;
}


function getMousePos(canvas, evt) {
let rect = canvas.getBoundingClientRect();
return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
};
}



canvas.addEventListener("mousemove", function(evt) {
mousePos = getMousePos(canvas, evt);
}, false);
