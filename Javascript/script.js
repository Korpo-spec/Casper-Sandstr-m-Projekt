
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
    if (deltaTime > 0.7) {
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
    
}
let towerPlacement = 1;
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










/*
let board = new Array(100);




class MazeNode{

    constructor(parent, position2){
        this.parent = parent;
        
        this.position2 = position2;

        this.f = 0;
        this.h = 0;
        this.g = 0;
    }

    
    
}


for (let index = 0; index < board.length; index++) {
    
    board[index]= new Array(100);
}
for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board.length; y++) {
        board[x][y]= 0;
    }
}





function ButtonClicked() {
    let startPos = [5, 5];
    let endPos = [50,50];
    console.log(endPos);
    let path = startPathfind(startPos, endPos);
    console.log(path);
}

async function startPathfind(startPos, endPos) {
    console.log("Works");
    console.log(endPos);
    console.log(arguments[1]);
    let startNode = new MazeNode(null, startPos);
    
    let endNode = new MazeNode(null, endPos);

    console.log(endNode)

    console.log(startNode.position2[0]);
    let openList = new Array(1);
    let closedList = new Array(1);

    openList[0] = startNode;
    console.log(openList[0].position2[0]);
    const context = canvas.getContext('2d');    
    context.fillStyle = "#FF0000";
    console.log(openList[0].position2);
    context.fillRect(openList[0].position2[0]*10, openList[0].position2[1]*10,10,10);
    context.fillRect(endPos[0]*10, endPos[1]*10, 10, 10);
    

    while (openList.length > 0) {
        
        let currentNode = openList[0]
        let currentIndex = 0;
        let adjecentNodes = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        let index = 0;

        console.log("Open nodes:" + openList.length);
        console.log(openList);
        
        
        openList.forEach(element => {
            
            if (element.f < currentNode.f) {
                currentNode = element;
                currentIndex = index;

            }
            index++;
        });
        context.fillStyle = "#FFFF00";
        
        
        

        openList.splice(currentIndex);
        closedList.push(currentNode);
        context.fillRect(currentNode.position2[0]*10, currentNode.position2[1]* 10, 10, 10);
        
        if (endNode.position2[0] == currentNode.position2[0] &&endNode.position2[1] == currentNode.position2[1]) {
            let path = new Array();
            let current = currentNode;
            while (current != null) {
                path.push(current.position2)
                current = current.parent
            }
            console.log("pathFound");
            console.log(path);
            path.forEach(element => {
                

                context.fillStyle = "#FF0000";
                context.fillRect(element[0]*10, element[1]*10, 10 ,10);
            });
            return path;
        }

        let children = new Array(4);

        adjecentNodes.forEach(function(element) {
            
            let nodePos = [(currentNode.position2[0] + element[0]), (currentNode.position2[1] + element[1])];
            
            if (nodePos[0] < 0|| nodePos[1] < 0|| nodePos[0] > board.length-1 ||nodePos[1] > board.length-1) {
                console.log("YOu out");
                return;
                
            }

            
            let skip = 0;
            closedList.forEach(element => {
                if (nodePos == element.position2) {
                    skip = 1;
                }
            });
            
            if (skip == 1) {
                return;
            }
            
            
            if (board[nodePos[0]][nodePos[1]] == 1) {
                console.log("YOu out");
                return;
            }
        
            
            newNode = new MazeNode(currentNode, nodePos);

            
            

            children.push(newNode);
        });

        

        children.forEach(async function(child) {

            console.log("checking new child");
            
            let skip = 0;
            
            closedList.forEach(closedChild => {
                
                if (child == closedChild) {
                    skip = 1;
                    // child.position2[0] == closedChild.position2[0] &&child.position2[1] == closedChild.position2[1]
                }
            });
            if (skip == 1) {
                console.log("child is on closedList");
                    return;
            }
            else{
                child.g = currentNode.g + 1;
            
                //child.h = (Math.pow( (child.position2[0]- endNode.position2[0]), 2) + Math.pow((child.position2[1]- endNode.position2[1]),2))
                child.h = Math.abs( child.position2[0]- endNode.position2[0]) + Math.abs( child.position2[1]- endNode.position2[1]);
                
                child.f = child.g + child.h;

                console.log(child.g);
                console.log(child.h);
                console.log(child.f);
    
                
                skip = 0;
    
                openList.forEach(element => {
                    if (element == child && element.g <= child.g) {
                        console.log("is on openList");
                        skip = 1;
                    }
                });
    
                
                if (skip == 1) {
                    console.log("child is already on openlist");
                        return;
                }
                else{
    
                    console.log("Done checking")
                    openList.push(child);
                    context.fillStyle = "#FF00FF";
                    context.fillRect(child.position2[0]*10, child.position2[1]* 10, 10, 10);
                    context.font = "8px Arial";
                    context.fillStyle = "#000000";
                    context.fillText(child.f, child.position2[0]*10, child.position2[1]* 10 + 10);
                }
            }
            
            
            

        });
        
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

          
          
          await sleep(10000)
        
    }

    console.log("out of stuff");

}

*/





