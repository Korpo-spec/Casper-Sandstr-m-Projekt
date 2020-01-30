
let lastUpdate = Date.now();
let myInterval = setInterval(tick, 0);
let enemies = new Array();
let towers = new Array();
document.getElementById("startbutton").addEventListener("click", ButtonClicked);
document.getElementById("createTower").addEventListener("click", CreateTower);

function tick() {
    let now = Date.now();
    let dt = now - lastUpdate;
    lastUpdate = now;

    Draw(dt);
}

let path = [[30, 1],[80, -2],[60, 1],[20, 2],[100, 1], [80, -2] ,[140,1]];
//let enemy = new Enemy([10,20], 50, 1, path);


console.log(path[1][0])
function Draw(dt) {

    let division = dt/1000;

    towers.forEach(tower => {
        tower.Shoot(enemies, division);

    });
    
    enemies.forEach(enemy =>{
        enemy.clearDraw();
    });

    enemies.forEach(enemy => {
        
        enemy.Draw(division);
    });
    
    enemies.forEach(enemy => {
        if (enemy.position[0] > 140) {
            console.log("Destroy");
            enemies.splice(enemies.indexOf(enemy), 1);
        }
    });



}

async function ButtonClicked() {

    let enemy = new Enemy([10,20], 50, 40, path);
    enemies.push(enemy);
    
    /*
    for (let index = 0; index < 20; index++) {
        let enemy = new Enemy([10,20], 50, 2, path);
        enemies.push(enemy);
        await sleep(500);
    }
    */
    
}

function CreateTower() {
    console.log("creating tower")
    let tower = new Tower([40,30], 1, 1, 3);
    towers.push(tower);
    context.fillStyle = "#000000";
    context.fillRect(400, 300, 50, 50);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}






const canvas = document.getElementById("canvas");







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

var mouseDown = false;
document.body.onmousedown = function() { 
  mouseDown = true;
}
document.body.onmouseup = function() {
  mouseDown = false;
}

function DrawSquare(canvas, mousePosX, mousePosY) {
    const context = canvas.getContext('2d');
    if (mouseDown) {
        context.fillRect((Math.floor(mousePosX/10)*10) ,(Math.floor(mousePosY/10)*10),10,10);

        //board[(Math.floor(mousePosX/10))][(Math.floor(mousePosY/10))] = 1;

    }
    
  }
  function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  let context = canvas.getContext('2d');

  canvas.addEventListener("mousemove", function(evt) {
    let mousePos = getMousePos(canvas, evt);
    
    DrawSquare(canvas, mousePos.x , mousePos.y);
  }, false);





