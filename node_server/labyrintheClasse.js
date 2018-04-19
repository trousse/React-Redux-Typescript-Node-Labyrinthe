export class lockerGrid {
    constructor(xSize, ySize) {
        this.grid = [];
        for (let i = 0; i < xSize; i++) {
            let newColone = [];
            for (let j = 0; j < ySize; j++) {
                newColone.push(true);
            }
            this.grid.push(newColone);
        }
    }
    lock(coor, action) {
        let target = this.grid[coor.x][coor.y];
        let isNotInGridRange = !(coor.x < this.grid.length && coor.y < this.grid[0].length);
        if (isNotInGridRange) {
            console.error('try to lock case out of grid range');
        }
        if (target === true) {
            this.grid[coor.x][coor.y] = false;
            action()
                .then(() => this.deslock(coor))
                .catch((err) => { err ? console.error(err) : console.error('action trow err'); });
        }
        else {
            console.error('case already use');
        }
    }
    deslock(coor) {
        if (this.grid[coor.x][coor.y] === false)
            this.grid[coor.x][coor.y] = true;
    }
}
