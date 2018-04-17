import { S_IFIFO } from "constants";

export interface Icoor{
    x :number,
    y :number 
}

export class lockerGrid{
    private grid : boolean[][] = [[]];

    constructor(xSize:number,ySize:number){
        for(let i = 0;i<xSize;i++){
            for(let j = 0;j<ySize;j++){
                this.grid[i][j]=true;
            }
        }
    }

    public lock(coor:Icoor,action:()=>Promise<void> ){
    
        let target = this.grid[coor.x][coor.y];
        let isNotInGridRange:boolean = !(coor.x < this.grid.length && coor.y<this.grid[0].length);
        if(isNotInGridRange){
            console.error('try to lock case out of grid range');         
        }
        
        if(target === true){
            this.grid[coor.x][coor.y] = false;
             action()
             .then(()=>this.deslock(coor))
             .catch((err)=>{err ? console.error(err) : console.error('action trow err')})
        }
        else{
            console.error('case already use');
            
        }
    }

    private deslock(coor:Icoor){
        let target = this.grid[coor.x][coor.y];
        if(target===false) target = true;
    }
}