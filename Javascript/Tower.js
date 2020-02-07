class Tower {
    constructor(position, damage, fireRate, range, rotation){
        this.position = position;
        this.damage = damage;
        this.fireRate = fireRate;
        this.range = range;
        this.targetDistance = new Array();
        this.targetInRange;
        this.target = new Enemy([1,1], 1,1,[1,1]);
        

        this.rotation = rotation;
        this.sizeOfTower = 50;
        this.deltaTime = 0;
        this.shot = 0 ;
    }
    
    clearDraw() {
        context.clearRect(this.position[0]*10 - 28, this.position[1]*10 - 28, 105, 105);
        
    }

    Shoot(enemies, deltaTime){

        this.clearDraw();
        
        if (Math.abs(this.target.position[0]- this.position[0]) + Math.abs(this.target.position[1]- this.position[1]) < this.range) {
            
            if (this.target.position[0] < this.position[0]&&this.target.position[1] < this.position[1]) {
                //upper left quadrant
                let b = Math.abs(this.target.position[0]- this.position[0]);
                let a = Math.abs(this.target.position[1]- this.position[1]);

                let tan = a/b;
                this.rotation = Math.atan(tan);
            }
            if (this.target.position[0] > this.position[0]&&this.target.position[1] < this.position[1]) {
                //upper right quadrant
                let b = Math.abs(this.target.position[0]- this.position[0]);
                let a = Math.abs(this.target.position[1]- this.position[1]);

                let tan = a/b;
                this.rotation = -Math.atan(tan) + 3.1415926536;
            }
            if (this.target.position[0] < this.position[0]&&this.target.position[1] > this.position[1]) {
                //lower left quadrant
                let b = Math.abs(this.target.position[0]- this.position[0]);
                let a = Math.abs(this.target.position[1]- this.position[1]);

                let tan = a/b;
                this.rotation = -Math.atan(tan);
            }
            if (this.target.position[0] > this.position[0]&&this.target.position[1] > this.position[1]) {
                //lower right quadrant
                let b = Math.abs(this.target.position[0]- this.position[0]);
                let a = Math.abs(this.target.position[1]- this.position[1]);

                let tan = a/b;
                this.rotation = Math.atan(tan) + 3.1415926536;
            }

            

        }
        else{
            
            let indexes = [];
            let targetsInrange = enemies.filter((enemy) => 
            Math.abs(enemy.position[0]- this.position[0]) + Math.abs(enemy.position[1]- this.position[1]) < this.range
            );
            /*
            targetsInrange.sort(function(enemy, enemy2) {
            return (Math.abs(enemy.position[0]- this.position[0]) + Math.abs(enemy.position[1]- this.position[1])) - (Math.abs(enemy2.position[0]- this.position[0]) + Math.abs(enemy2.position[1]- this.position[1]));
            });
            */
            //behövs den verkligen?
            targetsInrange.forEach(element => {
            indexes.push(enemies.indexOf(element));
            });

            if (targetsInrange[0] != null) {
                this.target = targetsInrange[0];
            }
            
        }
        context.save();
        context.fillStyle = "#000000";
        context.translate(((this.position[0]*10) + (this.sizeOfTower/2)), ((this.position[1]* 10) + (this.sizeOfTower/2)));
        context.rotate(this.rotation);
        context.translate(-((this.position[0]*10) + (this.sizeOfTower/2)), -((this.position[1]*10) + (this.sizeOfTower/2)));
        context.fillRect((this.position[0]* 10), (this.position[1]* 10), this.sizeOfTower, this.sizeOfTower);
        context.fillRect(this.position[0]*10 - 25, this.position[1]*10 + (this.sizeOfTower/4), 30 , 24);
        context.restore();

        if (this.deltaTime > this.fireRate) {
            this.shot = 1;
            this.target.health -= this.damage;
            this.deltaTime = 0;
            let shot = new LightningShot(this.target.position, this.position, this.rotation);
            
            if (this.target.health < 0) {
                
                this.target.clearDraw();
                this.target = new Enemy([1,1], 1,1,[1,1]);
            }
            return shot;
            

        }
        
        
        
        
        this.deltaTime += deltaTime;
        
        /*
        enemy.forEach(enemy => {
           
            if (enemy.position[0] > this.position[0] - 11 && enemy.position[0] < this.position[0] + 11 && enemy.position[1] > this.position[1] - 11 && enemy.position[1] < this.position[1] + 11 ) {
                if (this.deltaTime > this.fireRate && this.shot == 0) {
                    console.log("hit");
                    enemy.health += -20;
                    this.deltaTime = 0;
                    this.shot = 1;
                    let shot = new Shot(enemy.position, this.position);
                    return shot;
                }
                else{
                    this.shot = 0;
                }
            }
            
        });
        */
        

    }
}