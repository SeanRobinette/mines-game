import React from 'react';
import './Grid.css';
// Fisher-Yates implementation from https://javascript.info/task/shuffle
function shuffle(array) {
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

class Board {
    values;
    width;
    height;
    mineCount;

    constructor(w,h,m) {
        this.width = w;
        this.height = h;
        this.mineCount = m;

        // Initialize with an empty array of size w * h
        this.values = Array(w*h).fill();
        // Set the first m values to X, and the rest to an empty string
        this.values = this.values.map((_, i) => (i < m) ? 'X' : '');
        // Shuffle the mines into random locations
        shuffle(this.values);
        console.log(this.values);
    }
    get(r, c) {
        return this.values[c + r * this.width];
    }
}

export class Square extends React.Component {
    render() {
        return <td className="square">{this.props.value}</td>
    }
}

export class Grid extends React.Component {
    constructor(props) {
        super(props);
        // Array of, eg, 100 increasing values (0, ..., 99)
        this.state = {
            board: new Board(10,10,20)
        };
    }
    render() {
        const rows = this.props.height;
        const cols = this.props.width;
        const board = this.state.board;
        
        // Loop over rows, then columns, adding <tr> and <td> tags respectively
        const content = Array(rows).fill().map((_, r) => (
            <tr key={r}>
                {Array(cols).fill().map((_, c) => (
                    <Square value={board.get(r,c)} key={c}/>
                ))}
            </tr>
        ));
        return (
            <table className="grid">
                <tbody>
                {content}
                </tbody>
            </table>
            )
    }
}