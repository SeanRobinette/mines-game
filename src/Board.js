export class Board {
    displayValues;
    trueValues;
    width;
    height;
    mineCount;

    constructor(w,h,m) {
        this.width = w;
        this.height = h;
        this.mineCount = m;
        
        this.reset(w,h,m);
    }
    // Fisher-Yates implementation from https://javascript.info/task/shuffle
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    
            // swap elements array[i] and array[j]
            // we use "destructuring assignment" syntax to achieve that
            // you'll find more details about that syntax in later chapters
            // same can be written as:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    countAdjacent(r, c) {
        let count = 0;
        for(const off_c of [-1,0,1]) {
            for(const off_r of [-1,0,1]) {
                if(this.get(r + off_r, c + off_c) === 'X') {
                    count++;
                }
            }
        }
        return count;
    }
    get(r, c) {
        if(this.isOutOfBounds(r,c)) {
            return '';
        }
        return this.trueValues[c + r * this.width];
    }
    getDisplay(r, c) {
        return this.displayValues[c + r * this.width];
    }
    set(r, c, value) {
        this.trueValues[c + r * this.width] = value;
    }
    isOutOfBounds(r, c) {
        return r < 0 || c < 0 || r >= this.height || c >= this.width;
    }
    isShowing(r, c) {
        const val = this.getDisplay(r,c);
        return !(val === '?' || val ==='x')
    }
    reveal(r, c) {
        if(this.isOutOfBounds(r, c)) {
            return;
        }
        if(this.isShowing(r, c)) {
            return;
        }

        console.log('reveal: ' + this.displayValues[c + r * this.width] + '->' + this.trueValues[c + r * this.width]);
        this.displayValues[c + r * this.width] = this.trueValues[c + r * this.width];
        // If there are no adjacent mines, propagate to reveal adjacent tiles
        if(this.trueValues[c + r * this.width] === 0) {
            console.log('propagate!')
            for(let r_off of [-1,0,1]) 
                for(let c_off of [-1,0,1]) 
                    if(!(r_off === 0 && c_off === 0))
                        this.reveal(r + r_off, c + c_off);
        }
    }
    mark(r, c) {
        if(this.isOutOfBounds(r, c))
            return;
        if(this.getDisplay(r, c) !== '?')
            return;
        this.displayValues[c + r * this.width] = 'x';
    }
    reset(w,h,m) {
        // Initialize with an empty array of size w * h
        this.displayValues = Array(w*h).fill('?');
        this.trueValues = Array(w*h).fill();
        
        // Set the first m values to be mines, and the rest to empty tiles
        this.trueValues = this.trueValues.map((_, i) => (i < m) ? 'X' : '');

        // Shuffle the mines into random locations
        this.shuffle(this.trueValues);

        // Count adjacent mines and update the board with the counts
        for(let c = 0; c < this.width; c++) {
            for(let r = 0; r < this.height; r++) {
                if(this.get(r, c) !== 'X') {
                    this.set(r, c, this.countAdjacent(r, c));
                }
            }
        }

    }
}
