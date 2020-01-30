class Tower {
    constructor(position, damage, fireRate, range){
        this.position = position;
        this.damage = damage;
        this.fireRate = fireRate;
        this.range = range;

        let rotation = 0;
        this.deltaTime = 0;
        this.shot = 0 ;
    }

    Shoot(enemies, deltaTime){
        
        this.deltaTime += deltaTime;
        enemies.forEach(enemy => {
            if (this.deltaTime > 10 && this.shot == 0) {
                if (enemy.position[0] > this.position[0] - 11 && enemy.position[0] < this.position[0] + 11 && enemy.position[1] > this.position[1] - 11 && enemy.position[1] < this.position[1] + 11 ) {
                    console.log("hit");
                    enemy.health += -20;
                    this.deltaTime = 0;
                    this.shot = 1;
                }
            }
            else{
                this.shot = 0;
            }
            
            
        });

    }
}