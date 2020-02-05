class Enemy{
    constructor(position, health, movementSpeed, path){
        this.position = position;
        this.health = health;
        this.movementSpeed = movementSpeed;
        this.path = path;
        
        
        
        if (Math.abs(path[0][1]) == 1) {
            this.XChanger = path[0][1];
        }
        else{
            this.XChanger = 0;
        }
        if (Math.abs(path[0][1]) == 2) {
            this.YChanger = path[0][1]/2;
        }
        else{
            this.YChanger = 0
        }
        
        
        this.currentPathPoint = 0;
    }

    clearDraw() {
        context.clearRect(this.position[0]*10 - 2, this.position[1]*10 - 2, 55, 55);
    }

    Draw(division) {
        
        
        
        
        
        if (this.XChanger != 0 )  {
            
            if (this.position[0] > this.path[this.currentPathPoint ][0] && this.XChanger > 0) {
                
                this.YChanger = path[this.currentPathPoint + 1][1] / -2;
                
                this.XChanger = 0;
                this.currentPathPoint += 1;
            }
            else if (this.position[0] < this.path[this.currentPathPoint ][0] && this.XChanger < 0) {
                
                this.YChanger = path[this.currentPathPoint + 1][1] / -2;
                this.XChanger = 0;
                this.currentPathPoint += 1;
            }
            
        }
        if (this.YChanger != 0)  {
            
            
            if (this.position[1] > this.path[this.currentPathPoint ][0] && this.YChanger > 0) {
                
                this.XChanger = path[this.currentPathPoint + 1][1];
                
                this.YChanger = 0;
                this.currentPathPoint += 1;
            }
            else if (this.position[1] < this.path[this.currentPathPoint ][0] && this.YChanger < 0) {
                
                this.XChanger = path[this.currentPathPoint + 1][1];
                
                this.YChanger = 0;
                this.currentPathPoint += 1;
            }
            
        }

        if (this.health < 40) {
            context.fillStyle = "#FF0000";
        }
        else{
            context.fillStyle = "#FFFF00";
        }
        

        this.position[0] += this.movementSpeed*division*this.XChanger;
        this.position[1] += this.movementSpeed*division*this.YChanger;
        context.fillRect(this.position[0]*10, this.position[1]*10, 50, 50);
        
    }
}