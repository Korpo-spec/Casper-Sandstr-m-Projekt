class Tower {
    constructor(position, damage, fireRate, range){
        this.position = position;
        this.damage = damage;
        this.fireRate = fireRate;
        this.range = range;
        this.targetDistance = new Array();
        this.targetInRange;
        this.target;

        this.rotation = 0;
        this.deltaTime = 0;
        this.shot = 0 ;
    }

    Shoot(enemies, deltaTime){

        
        
        let targetsInrange = enemies.filter((enemy) => 
            Math.abs(enemy.position[0]- this.position[0]) + Math.abs(enemy.position[1]- this.position[1]) < this.range
        );

        
        
        console.log(targetsInrange);
        

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