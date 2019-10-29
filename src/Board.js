export class Board {
    displayValues;
    trueValues;
    width;
    height;
    mineCount;
    state;

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

        // Grab the value being revealed
        const value = this.trueValues[c + r * this.width];

        // Set the display value to the revealed value
        console.log('reveal: ' + this.displayValues[c + r * this.width] + '->' + value);
        this.displayValues[c + r * this.width] = value;

        // If there are no adjacent mines, propagate to reveal adjacent tiles
        if(value === 0) {
            console.log('propagate!')
            for(let r_off of [-1,0,1]) 
                for(let c_off of [-1,0,1]) 
                    if(!(r_off === 0 && c_off === 0))
                        this.reveal(r + r_off, c + c_off);
        } else if(value === 'X') {
            console.log('You lost!');
            this.state = 'lost';
        }
        if(!(this.state === 'lost') && this.checkForWin()) {
            console.log('You won!');
            this.state = 'won';
        }
    }
    checkForWin() {
        console.log('Checking for win...');
        for(let i=0;i<this.trueValues.length;i++) {
            // If the tile is empty
            if(this.trueValues[i] !== 'X') {
                // If the tile hasn't been revealed
                if(this.displayValues[i] !== this.trueValues[i]) {
                    // Then there is an empty tile left, so no win yet
                    console.log('Nope!');
                    return false;
                }
            }
        }
        return true;
    }
    mark(r, c) {
        if(this.isOutOfBounds(r, c))
            return;
        if(this.getDisplay(r, c) !== '?')
            return;
        this.displayValues[c + r * this.width] = 'x';
    }
    reset(w,h,m) {
        this.state = 'active';

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
