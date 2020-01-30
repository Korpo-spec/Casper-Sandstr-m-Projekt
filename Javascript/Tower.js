class Tower {
    constructor(position, damage, fireRate, range){
        this.position = position;
        this.damage = damage;
        this.fireRate = fireRate;
        this.range = range;

        let rotation = 0;
    }

    Shoot(enemies, deltaTime){
        enemies.forEach(enemy => {
            console.log(enemy.position[0]);
            console.log(this.position[0]);
            if (enemy.position[0] > this.position[0] - 11 && enemy.position[0] < this.position[0] + 11 && enemy.position[1] > this.position[1] - 11 && enemy.position[1] < this.position[1] + 11 ) {
                console.log("hit");
                enemy.health += -20;
            }
            
        });
    }
}