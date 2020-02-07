class LightningShot{
    constructor(posenemy, source, rotation){
        this.posenemy = posenemy;
        this.position = source;
        this.rotation =  rotation;
        this.deltatime = 0;
        this.sizeOfShot =20;
        this.movementspeed = 50;

        //this.distanceToTarget = Math.sqrt( Math.pow(this.position[0] - this.posenemy[0],2) + Math.pow(this.position[1] - this.posenemy[1],2) )
        this.distanceToTarget = 150;
        
    }

    Draww(){



        context.save();
        context.fillStyle = "#000000";
        context.translate(((this.position[0]*10) + (this.sizeOfShot/2)), ((this.position[1]* 10) + (this.distanceToTarget/2)));
        context.rotate(this.rotation);
        context.translate(-((this.position[0]*10) + (this.sizeOfShot/2)), -((this.position[1]*10) + (this.distanceToTarget/2)));
        context.fillRect((this.position[0]* 10), (this.position[1]* 10), this.sizeOfShot, this.distanceToTarget);
        
        context.restore();
    }
}