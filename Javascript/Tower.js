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
        this.deltaTime = 0;
        this.shot = 0 ;
    }
    
    clearDraw() {
        context.clearRect(this.position[0]*10 - 15, this.position[1]*10 - 15, 105, 105);
    }

    Shoot(enemies, deltaTime){

        this.clearDraw();
        
        if (Math.abs(this.target.position[0]- this.position[0]) + Math.abs(this.target.position[1]- this.position[1]) < this.range) {
            
            if (this.target.position[0] < this.position[0]&&this.target.position[1] < this.position[1]) {
                let b = Math.abs(this.target.position[0]- this.position[0]);
                let a = Math.abs(this.target.position[1]- this.position[1]);

                let tan = a/b;
                this.rotation = Math.atan(tan);
            }
            if (this.target.position[0] > this.position[0]&&this.target.position[1] < this.position[1]) {
                let b = Math.abs(this.target.position[0]- this.position[0]);
                let a = Math.abs(this.target.position[1]- this.position[1]);

                let tan = a/b;
                this.rotation = -Math.atan(tan);
            }
            if (this.target.position[0] < this.position[0]&&this.target.position[1] > this.position[1]) {
                let b = Math.abs(this.target.position[0]- this.position[0]);
                let a = Math.abs(this.target.position[1]- this.position[1]);

                let tan = a/b;
                this.rotation = -Math.atan(tan);
            }
            if (this.target.position[0] > this.position[0]&&this.target.position[1] > this.position[1]) {
                let b = Math.abs(this.target.position[0]- this.position[0]);
                let a = Math.abs(this.target.position[1]- this.position[1]);

                let tan = a/b;
                this.rotation = Math.atan(tan);
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
            //behövs den verkligen
            targetsInrange.forEach(element => {
            indexes.push(enemies.indexOf(element));
            });

            if (targetsInrange[0] != null) {
                this.target = targetsInrange[0];
            }
            
        }
        context.save();
        context.fillStyle = "#000000";
        context.translate(425, 325);
        context.rotate(this.rotation);
        context.translate(-425, -325);
        context.fillRect(400, 300, 50, 50);
        context.restore();
        
        
        this.deltaTime += deltaTime;
        
        /*
        enemy.forEach(enemy => {
           
            if (enemy.position[0] > this.position[0] - 11 && enemy.position[0] < this.position[0] + 11 && enemy.position[1] > this.position[1] - 11 && enemy.position[1] < this.position[1] + 11 ) {
                if (this.deltaTime > this.fireRate && this.shot == 0) {
                    console.log("hit");
                    enemy.health += -20;
                    this.deltaTime = 0;
                    this.shot = 1;
                    let shot = new LightningShot(enemy.position, this.position);
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