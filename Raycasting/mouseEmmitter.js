class MouseEmitter
{
    constructor()
    {
        this.pos = createVector(width/4,height/2);
        this.rays = [];
        this.heading = 0;
        let fov = 45;
        for(let a = -this.fov/2; a < this.fov/2; a += .5)
        {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    
    }

    show()
    {
        fill(255);
        strokeWeight(2);
        for(ray of this.rays)
        {
            ray.show();
            
        }
    }

    rotate(angle)
    {
        this.heading += angle;
        let index = 0;
        for(let a = -this.fov/2; a < this.fov/2; a += .5)
        {
            this.rays[index].setAngle(radians(a) + this.heading);
            index ++;
        }
    }

    look(walls)
    {
        const scene = [];
        for(let i = 0; i < this.rays.length; i++)
        {
            const ray = this.rays[i];
            let record = Infinity;
            let closest = null;
            for(let wall of walls)
            {
                const pt = ray.cast(wall);
                
                if(pt)
                {
                    let d = p5.Vector.dist(this.pos, pt);//Euclidean Distance
                    const a = ray.dir.heading() - this.heading;
                    d *= cos(a); // Projecting rays vector onto Camera Vector
                    if(d < record)
                    {
                        record = min(d,record);
                        closest = pt;
                    }
                    
                    
                }
            }
            if(closest)
            {
                stroke(255, 255, 0, 70);
                line(this.pos.x,this.pos.y,closest.x,closest.y);
                
                
            }
            scene[i] =record;
        }
        return scene; 
    }

    update(x,y)
    {
        this.pos.set(x,y);

    }
    move(amt)
    {
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amt);
        this.pos.add(vel);
    }
    updateFOV(fov)
    {
        this.fov = fov
        this.rays = [];
        for(let a = -this.fov/2; a < this.fov/2; a += .5)
        {
            this.rays.push(new Ray(this.pos, radians(a) + this.heading));
        }
    }
}